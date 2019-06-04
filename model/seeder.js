const Utilisateur = require('./utilisateur')
const Commentaire = require('./commentaire')
const Like = require('./like')
const Defi = require('./defi')
const DefiSauvegarde = require('./defiSauvegarde')

module.exports = (utilisateurdao, commentairedao, likedao, defidao, defisauvegardedao, done) => {
    utilisateurdao.db.run("CREATE TABLE utilisateur (id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " nom TEXT, prenom TEXT, email TEXT UNIQUE, motdepasse TEXT, filtrerealisation BOOLEAN, datedecreation INTEGER)",
        (err) => {            
            if (err == null) {
                utilisateurdao.db.serialize(() => {
                    for (let i = 1; i < 10; i++) {
                        utilisateurdao.insert(new Utilisateur(`${i}`, `${i}`, `${i}`, `${i}`, false, new Date())
                            , () => {})
                    }
                    done()
                })
            }
        })

    commentairedao.db.run("CREATE TABLE commentaire (id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " utilisateur INTEGER, defi INTEGER, preuve INTEGER, valide BOOLEAN, texte TEXT, datedecreation INTEGER)",
        (err) => {
        })
        
    likedao.db.run("CREATE TABLE like (id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " utilisateur INTEGER, defi INTEGER)",
        (err) => {
        })
    
    defidao.db.run("CREATE TABLE defi (id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " utilisateur INTEGER, texte TEXT, masque BOOLEAN, datedecreation INTEGER)",
        (err) => {
            if (err == null) {
                defidao.db.serialize(() => {
                    for (let i = 1; i < 10; i++) {
                        defidao.insert(new Defi(`${i}`, `azdnoazdaznpdapipjpackkqsncklnqsklncklqsncknqskcnldzaidpjazzzodjpoazjdopazjcksnmnlsivhiqjgiejgkknvjndjkvizd
                        `, false, new Date())
                            , () => {})
                    }
                    done()
                })
            }
        })
    
    defisauvegardedao.db.run("CREATE TABLE defiSauvegarde (id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " utilisateur INTEGER, defi INTEGER)",
        (err) => {
        })
}