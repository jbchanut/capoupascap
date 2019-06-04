const Defi = require( "./defi" )

module.exports = class DefiDao  {
    constructor(db) {
        this.db = db
    }

    insert(defi, done) {
        const stmt = this.db.prepare("INSERT INTO defi(utilisateur, texte, masque, datedecreation) VALUES (?, ?, ?, ?)")
        stmt.run([defi.utilisateur, defi.texte, defi.masque, defi.datedecreation], done)
        stmt.finalize()
    }

    update(id, defi, done)    {
        const stmt = this.db.prepare( "UPDATE defi SET masque=? WHERE id=?" )
        stmt.run(defi.masque, id, done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM defi WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    getAll(tri, filtreRealisation, done) {
        const defi = []
        console.log(tri, filtreRealisation)
        this.db.each(
            tri ? "SELECT * FROM defi WHERE masque=? ORDER BY datedecreation DESC"
                : "SELECT (SELECT count(*) FROM like l WHERE d.id=l.defi) as nbLike, * FROM defi d WHERE masque=? ORDER BY nbLike DESC"
            , [filtreRealisation],
            (err, row) => {
                if (err == null) {
                    let d = Object.assign(new Defi(), row)
                    d.id = row.id
                    defi.push(d)
                }
            },
            (err) => {
                if (err == null && done) {
                    done(defi)
                }
            }
        )
    }

    getByUtilisateurId(id, done) {
        const defi = []
        this.db.each("SELECT * FROM defi WHERE utilisateur=? ORDER BY datedecreation", [id],
            (err, row) => {
                if (err == null) {
                    let d = Object.assign(new Defi(), row)
                    defi.push(d)
                }
            },
            (err) => {
                if (err == null && done) {
                    done(defi)
                }
            }
        )
    }

    getById(id, done)   {
        let defi = null
        this.db.each( "SELECT * FROM defi WHERE id = ?", [id],
            (err, row) => {
                if (err == null) defi = Object.assign(new Defi(), row)
            },
            () => { done(defi) }
        )
    }
}