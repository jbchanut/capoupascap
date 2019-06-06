module.exports = (app, dao, auth) => {
    
    app.get("/defi/all/:tri", (req, res) => {
        dao.getAll(req.params.tri, req.user, (defi) => {            
            res.json(defi)
        })
    })
    
    app.get("/defi/allArchives", (req, res) => {
        dao.getArchives(req.user.id, (defi) => {            
            res.json(defi)
        })
    })
    
    app.get("/defi/allProfil", (req, res) => {
        dao.getAllUtilisateur(req.user.id, (defi) => {            
            res.json(defi)
        })
    })
    
    app.get("/defi/allUtilisateur/:id", (req, res) => {
        dao.getAllUtilisateur(req.params.id, (defi) => {            
            res.json(defi)
        })
    })

    app.get("/defi/utilisateur/:id", (req, res) => {
        dao.getByUtilisateurId(req.params.id, (defi) => {
            res.json(defi)
        })
    })

    app.get("/defi/:id", (req, res) => {
        dao.getById(req.params.id, (defi) => {
            if (defi == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(defi)
            }
        })
    })

    app.post("/defi", (req, res) => {
        const defi = req.body
        defi.utilisateur = req.user.id
        if (defi.texte === undefined || defi.utilisateur === undefined || defi.datedecreation === undefined) {
            res.status(400).end()
            return
        }
        dao.insert(defi, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.put("/defi/:id", (req, res) => {
        const defi = req.body;
        if (defi.utilisateur === undefined || defi.texte === undefined 
            || defi.masque === undefined || defi.datedecreation === undefined) {
            res.status(400).type('text/plain').end()
            return
        }
        dao.update(req.params.id, defi, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.delete("/defi/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })
}
