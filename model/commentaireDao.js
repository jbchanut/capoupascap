const Commentaire = require( "./commentaire" )

module.exports = class CommentaireDao  {
    constructor(db) {
        this.db = db
    }

    update(id, commentaire, done)    {
        const stmt = this.db.prepare( "UPDATE commentaire SET utilisateur=?, defi=?, typepreuve=?, preuve=?, valide=?, texte=?, datedecreation=? WHERE id=?" )
        stmt.run(commentaire.utilisateur, commentaire.defi, commentaire.typepreuve, commentaire.preuve, 
            commentaire.valide, commentaire.texte, commentaire.datedecreation, id, done)
        stmt.finalize()
    }

    insert(commentaire, done) {
        const stmt = this.db.prepare("INSERT INTO commentaire(utilisateur, defi, typepreuve, preuve, valide, texte, datedecreation) VALUES (?, ?, ?, ?, ?, ?, ?)")
        stmt.run([commentaire.utilisateur, commentaire.defi, commentaire.typepreuve, commentaire.preuve, 
            commentaire.valide, commentaire.texte, commentaire.datedecreation], done)
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
                if (err == null)    {
                    commentaire = Object.assign(new Commentaire(), row)
            }},
            () => { done(personne) }
        )
    }

    getByDefiId(id, done) {
        const commentaire = []
        this.db.each("SELECT * FROM commentaire WHERE defi=? ORDER BY datedecreation DESC", [id],
            (err, row) => {
                if (err == null)    {
                    let c = Object.assign(new Commentaire(), row)
                    commentaire.push(c)
                }
            },
            (err) => {
                if (err == null && done) {
                    done(commentaire)
                }
            }
        )
    }

    countNombreCommentaire(defiId, done) {
        let nombreCommentaire = 0
        this.db.each( "SELECT count(*) as nb FROM commentaire WHERE defi = ?", [defiId],
            (err, row) => {
                if (err == null) {
                    nombreCommentaire = row.nb
                }
            },
            () => { done(nombreCommentaire) }
        )
    }
}