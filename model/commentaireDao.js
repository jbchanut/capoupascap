const Commentaire = require( "./commentaire" )

module.exports = class CommentaireDao  {
    constructor(db) {
        this.db = db
    }

    update(id, commentaire, done)    {
        const stmt = this.db.prepare( "UPDATE commentaire SET utilisateur=?, defi=?, datedecreation=? WHERE id=?" )
        stmt.run(commentaire.utilisateur, commentaire.defi, commentaire.datedecreation, id, done)
        stmt.finalize()
    }

    insert(commentaire, done) {
        const stmt = this.db.prepare("INSERT INTO commentaire(utilisateur, defi, datedecreation) VALUES (?, ?, ?)")
        stmt.run([commentaire.utilisateur, commentaire.defi, commentaire.datedecreation], done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM commentaire WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    getById(id, done) {
        let commentaire = null
        this.db.each( "SELECT * FROM commentaire WHERE id = ?", [id],
            (err, row) => {
                row.datedecreation ? row.datedecreation = true : row.datedecreation = false;
                if (err == null) commentaire = Object.assign(new Commentaire(), row)
            },
            () => { done(personne) }
        )
    }
}