module.exports = (app, dao, auth) => {

    app.get("/defiRealise/:id", (req, res) => {
        dao.getById(true, (defiRealise) => {
            if (defiRealise == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(defiRealise)
            }
        })
    })

    app.post("/defiRealise", (req, res) => {
        const defiRealise = req.body
        if (defiRealise.utilisateur === undefined || defiRealise.defi === undefined || defiRealise.valide === undefined) {
            res.status(400).end()
            return
        }
        dao.insert(defiRealise, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.delete("/defiRealise/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })
}
