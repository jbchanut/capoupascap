const bcrypt = require('bcrypt')
const Utilisateur = require( "./utilisateur" )

module.exports = class UtilisateurDao  {
    constructor(db) {
        this.db = db
    }

    update(id, utilisateur, done)    {
        const stmt = this.db.prepare( "UPDATE utilisateur SET nom=?, prenom=?, email=?, motdepasse=?, filtrerealisation=? WHERE id=?" )
            stmt.run(utilisateur.nom, utilisateur.prenom, utilisateur.email, utilisateur.motdepasse, utilisateur.filtrerealisation, id, done)                       
            stmt.finalize()  
    }

    insert(utilisateur, done) {
        const stmt = this.db.prepare("INSERT INTO utilisateur (nom, prenom, email, motdepasse, filtrerealisation, datedecreation) VALUES (?, ?, ?, ?, ?, ?)")
        stmt.run([utilisateur.nom, utilisateur.prenom, utilisateur.email,  this.hashMdp(utilisateur.motdepasse), utilisateur.filtrerealisation, utilisateur.datedecreation], done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM utilisateur WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    compareMdp(motdepasse, hash) {
        return bcrypt.compareSync(motdepasse, hash)
    }

    hashMdp(motdepasse) {
        return bcrypt.hashSync(motdepasse, 10)  // 10 : cost factor -> + élevé = hash + sûr
    }

    getById(id, done) {
        let utilisateur = null
        this.db.each("SELECT * FROM utilisateur WHERE id = ?", [id],
            (err, row) => { if (err == null)    {
                utilisateur = Object.assign(new Utilisateur(), row)
            }},
            () => { done(utilisateur) }
        )
    }

    getByEmail(email, done) {
        let utilisateur = null
        this.db.each("SELECT * FROM utilisateur WHERE email = ?", [email],
            (err, row) => { if (err == null)    {
                utilisateur = Object.assign(new Utilisateur(), row)
            }},
            () => { done(utilisateur) }
        )
    }
}