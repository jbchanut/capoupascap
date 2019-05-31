const DefiRealise = require( "./defiRealise" )

module.exports = class DefiRealiseDao  {
    constructor(db) {
        this.db = db
    }

    insert(defiRealise, done) {
        const stmt = this.db.prepare("INSERT INTO defirealise(utilisateur, defi, preuve, valide) VALUES (?, ?, ?, ?)")
        stmt.run([defiRealise.utilisateur, defiRealise.defi, defiRealise.preuve, defiRealise.valide], done)
        stmt.finalize()
    }

    delete(id, done)    {
        const stmt = this.db.prepare( "DELETE FROM defirealise WHERE id=?" )
        stmt.run(id, done)
        stmt.finalize()
    }

    getById(id, done) {
        let defiRealise = null
        this.db.each( "SELECT * FROM defirealise WHERE id = ?", [id],
            (err, row) => {
                row.preuve ? row.preuve = true : row.preuve = false;
                if (err == null) defiRealise = Object.assign(new DefiRealise(), row)
            },
            () => { done(personne) }
        )
    }
}