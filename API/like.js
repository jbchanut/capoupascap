module.exports = (app, dao, auth) => {

    app.get("/like/:id", (req, res) => {
        dao.getById(true, (like) => {
            if (like == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(like)
            }
        })
    })

    app.get("/like/special/:defiId", (req, res) => {
        dao.getSpecial(req.user.id, req.params.defiId, (like) => {
            if (like == null) {
                res.status(404).type('text/plain').end()
            } else {
                res.json(like)
            }
        })
    })
    
    app.get("/like/count/:defiId", (req, res) => {
        dao.countNombreLike(req.params.defiId, (nombreLike) => {
            res.json(nombreLike)
        })
    })

    app.post("/like", (req, res) => {
        let like = req.body
        like.utilisateur = req.user.id
        if (like.utilisateur === undefined || like.defi === undefined) {
            res.status(400).end()
            return
        }
        dao.getSpecial(like.utilisateur, like.defi, (status) => {
            if(status !== 200)  {
                dao.insert(like, (err) => {
                    if (err == null) {
                        res.status(200).type('text/plain').end()
                    } else {
                        res.status(500).end()
                    }
                }) 
            }
        })       
    })

    app.delete("/like/:id", (req, res) => {
        dao.delete(req.params.id, (err) => {
            if (err == null) {
                res.status(200).type('text/plain').end()
            } else {
                res.status(500).end()
            }
        })
    })
}
