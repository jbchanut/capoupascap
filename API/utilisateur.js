module.exports = (app, dao, auth) => {

    /*app.get("/utilisateur", (req, res) => {
        dao.getAll((utilisateurs) => {
            res.json(utilisateurs)
        })
    })*/

    app.get("/utilisateur/compare/:mdp", (req, res) => {
        res.jsonp(dao.compareMdp(req.params.mdp, req.user.motdepasse))
    })

    app.get("/utilisateur/email/:email", (req, res) => {
        dao.getByEmail(req.params.email, (utilisateur) => {
            if (utilisateur == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.jsonp(utilisateur)
            }
        })
    })

    app.get("/utilisateur/connecte", (req, res) => {
        dao.getById(req.user.id, (utilisateur) => {
            if (utilisateur == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.jsonp(utilisateur)
            }
        })
    })

    app.post("/utilisateur", (req, res) => {
        const utilisateur = req.body
        if (utilisateur.nom === undefined || utilisateur.prenom === undefined || utilisateur.email === undefined
            || utilisateur.motdepasse === undefined || utilisateur.datedecreation === undefined) {
            res.status(400).end()
            return
        }
        dao.insert(utilisateur, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })   
    })

    app.delete("/utilisateur/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.put("/utilisateur/:id", (req, res) => {
        const utilisateur = req.body;
        if (utilisateur.nom === undefined || utilisateur.prenom === undefined || utilisateur.email === undefined
            || utilisateur.motdepasse === undefined || utilisateur.datedecreation === undefined) {
            res.status(400).type('text/plain').end()
            return
        }
        if(utilisateur.motdepasse !== req.user.motdepasse)  {
            utilisateur.motdepasse = dao.hashMdp(utilisateur.motdepasse)
        }
        dao.update(req.params.id, utilisateur, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

}
