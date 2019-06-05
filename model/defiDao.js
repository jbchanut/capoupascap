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

    getAll(tri, utilisateur, done) {
        const defi = []
        if(utilisateur.filtrerealisation)   {
            this.db.each(
                tri ? "SELECT * FROM defi WHERE masque=0 ORDER BY datedecreation DESC;" + 
                      "SELECT * FROM defi d WHERE d.masque=1 AND (d.utilisateur=? OR d.utilisateur=(SELECT l.utilisateur FROM like WHERE l.utilisateur=?)) ORDER BY datedecreation DESC; "
                    : "SELECT (SELECT count(*) FROM like l WHERE d.id=l.defi) as nbLike, * FROM defi d WHERE masque=0 ORDER BY nbLike DESC; " +
                      "SELECT (SELECT count(*) FROM like l WHERE d.id=l.defi) as nbLike, * FROM defi d WHERE d.masque=1 AND (d.utilisateur=? OR d.utilisateur=(SELECT l.utilisateur FROM like WHERE l.utilisateur=?)) ORDER BY nbLike DESC;"
                , [utilisateur.id, utilisateur.id],
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
        }   else    {
            this.db.each(
                tri ? "SELECT * FROM defi WHERE masque=0 ORDER BY datedecreation DESC"
                    : "SELECT (SELECT count(*) FROM like l WHERE d.id=l.defi) as nbLike, * FROM defi d WHERE masque=0 ORDER BY nbLike DESC"
                , [],
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
    }

    getAllUtilisateur(id, done) {
        const defi = []
        this.db.each("SELECT * FROM defi WHERE utilisateur=? ORDER BY datedecreation DESC", [id],
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
    
    getArchives(id, done) {
        const defi = []
        this.db.each("SELECT * FROM defi d LEFT JOIN defisauvegarde df on(d.id=df.defi) WHERE df.utilisateur=? ORDER BY d.datedecreation", [id],
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