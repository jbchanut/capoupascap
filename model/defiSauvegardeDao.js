const DefiSauvegarde = require( "./defiSauvegarde" )

module.exports = class DefiSauvegardeDao  {
    constructor(db) {
        this.db = db
    }


    insert (defiSauvegarde, done) {
        const stmt = this.db.prepare("INSERT INTO defiSauvegarde (utilisateur, defi) VALUES (?, ?)")
        stmt.run([defiSauvegarde.utilisateur, defiSauvegarde.defi], done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM defiSauvegarde WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    getById(id, done) {
        let defiSauvegarde = null
        this.db.each( "SELECT * FROM defiSauvegarde WHERE id = ?", [id],
            (err, row) => {
                if (err == null) defiSauvegarde = Object.assign(new DefiSauvegarde(), row)
            },
            () => { done(personne) }
        )
    }

    getSpecial(utilisateurId, defiId, done) {
        let defiSauvegarde = null
        this.db.each( "SELECT * FROM defiSauvegarde WHERE utilisateur = ? AND defi = ?", [utilisateurId, defiId],
            (err, row) => {
                if (err == null) defiSauvegarde = Object.assign(new DefiSauvegarde(), row)
            },
            () => { done(defiSauvegarde) }
        )
    }
}