module.exports = (app, dao, auth) => {

    app.get("/commentaire/defi/:id", (req, res) => {
        dao.getByDefiId(req.params.id, (commentaire) => {
            res.json(commentaire)
        })
    })

    app.get("/commentaire/:id", (req, res) => {
        dao.getById(true, (commentaire) => {
            if (commentaire == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(commentaire)
            }
        })
    })
    
    app.get("/commentaire/count/:defiId", (req, res) => {
        dao.countNombreCommentaire(req.params.defiId, (nombreCommentaire) => {
            res.json(nombreCommentaire)
        })
    })

    app.post("/commentaire", (req, res) => {
        let commentaire = req.body
        commentaire.utilisateur = req.user.id
        if (commentaire.utilisateur === undefined || commentaire.defi === undefined || 
            commentaire.texte === undefined || commentaire.datedecreation === undefined) {
            res.status(400).end()
            return
        }
        dao.insert(commentaire, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.delete("/commentaire/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

    app.put("/commentaire/:id", (req, res) => {
        const commentaire = req.body;
        if (commentaire.utilisateur === undefined || commentaire.defi === undefined || commentaire.datedecreation === undefined) {
            res.status(400).type('text/plain').end()
            return
        }
        dao.update(req.params.id, commentaire, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })

}
