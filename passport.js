const LocalStrategy = require('passport-local').Strategy
const Utilisateur = require('./model/utilisateur')

module.exports =  (passport, utilisateurDao) => {
    
    // objet utilisateur -> identifiant de session
    passport.serializeUser((utilisateur, done) => {
        done(null, utilisateur.email)
    })

    // identifiant de session -> objet utilisateur
    passport.deserializeUser((email, done) => {
        utilisateurDao.getByEmail(email, (utilisateur) => {          
            done(null, utilisateur)
        })
    })

    passport.use('local-login', new LocalStrategy({
            // champs du formulaire email
            usernameField: 'email',
            passwordField: 'motdepasse',
            passReqToCallback: true
        },
         (req, email, motdepasse, done) => {
            /*if (email[0] === 'z') {
                return done(null, new utilisateur(email))
            }
            return done(null, false)
            */
            utilisateurDao.getByEmail(email, (utilisateur) => {
                if (utilisateur != null && utilisateurDao.compareMdp(motdepasse, utilisateur.motdepasse)) {                    
                    return done(null, utilisateur)
                } else {
                    return done(null, false)
                }
            })
        })
    )

    // autoemail
    var defaultUtilisateur = null
    /*utilisateurDao.getByEmail("utilisateur1", (utilisateur) => {
        defaultutilisateur = utilisateur
    })*/

    return {
        isLoggedInAPI(req, res, next) {
            // autoemail
            if (defaultUtilisateur != null) {
                req.utilisateur = defaultUtilisateur
                return next()
            }
            // si utilisateur authentifié, continuer
            if (req.isAuthenticated()) {
                return next()
            }
            // sinon erreur 'Unauthorized'
            res.status(401).type("text/plain").end()
        },
        isLoggedInWeb(req, res, next) {
            // autoemail
            if (defaultUtilisateur != null) {
                req.utilisateur = defaultUtilisateur
                return next()
            }
            // si utilisateur authentifié, continuer
            if (req.isAuthenticated()) {
                return next()
            }
            // sinon afficher formulaire de email
            res.redirect('/')
        }
    }
}