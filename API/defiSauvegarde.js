module.exports = (app, dao, auth) => {

    app.get("/defiSauvegarde/:id", (req, res) => {
        dao.getById(true, (defiSauvegarde) => {
            if (defiSauvegarde == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(defiSauvegarde)
            }
        })
    })

    app.get("/defiSauvegarde/special/:defiId", (req, res) => {
        dao.getSpecial(req.user.id, req.params.defiId, (defiSauvegarde) => {
            if (defiSauvegarde == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(defiSauvegarde)
            }
        })
    })

    app.post("/defiSauvegarde", (req, res) => {
        let defiSauvegarde = req.body
        defiSauvegarde.utilisateur = req.user.id
        if (defiSauvegarde.utilisateur === undefined || defiSauvegarde.defi === undefined) {
            res.status(400).end()
            return
        }
        dao.getSpecial(defiSauvegarde.utilisateur, defiSauvegarde.defi, (status) => {
            if(status !== 200)  {
                dao.insert(defiSauvegarde, (err) => {
                    if (err == null) {
                        res.status(200).type('text/plain').end()
                    } else {
                        res.status(500).end()
                    }
                }) 
            }
        })       
    })

    app.delete("/defiSauvegarde/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })
}
