const Like = require( "./like" )

module.exports = class LikeDao  {
    constructor(db) {
        this.db = db
    }

    insert (like, done) {
        const stmt = this.db.prepare("INSERT INTO like (utilisateur, defi) VALUES (?, ?)")
        stmt.run([like.utilisateur, like.defi], done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM like WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    getById(id, done) {
        let like = null
        this.db.each( "SELECT * FROM like WHERE id = ?", [id],
            (err, row) => {
                if (err == null) like = Object.assign(new Like(), row)
            },
            () => { done(like) }
        )
    }

    getSpecial(utilisateurId, defiId, done) {
        let like = null
        this.db.each( "SELECT * FROM like WHERE utilisateur = ? AND defi = ?", [utilisateurId, defiId],
            (err, row) => {
                if (err == null) like = Object.assign(new Like(), row)
            },
            () => { done(like) }
        )
    }

    countNombreLike(defiId, done) {
        let nombreLike = 0
        this.db.each( "SELECT count(*) as nb FROM like WHERE defi = ?", [defiId],
            (err, row) => {
                if (err == null) {
                    nombreLike = row.nb
                }
            },
            () => { done(nombreLike) }
        )
    }
}