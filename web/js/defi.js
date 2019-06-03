const defiController = new DefiController()
const servicesUtilisateur = new ServicesUtilisateur()
let tri = false

servicesUtilisateur.getUtilisateurConnecte((status, res) => {
    if(status === 200)  {
        defiController.afficheTousLesDefis(tri, res.filtrerealisation)
    }
})

document.querySelector("#tri").addEventListener("click", () => {
    tri ? tri = false : tri = true
    servicesUtilisateur.getUtilisateurConnecte((status, res) => {
        if(status === 200)  {
            defiController.afficheTousLesDefis(tri, res.filtrerealisation)
        }
    })
})

document.querySelector("#filtre").addEventListener("click", () => {
    servicesUtilisateur.getUtilisateurConnecte((status, res) => {
        if(status === 200)  {
            res.filtrerealisation ? res.filtrerealisation = false : res.filtrerealisation = true

            servicesUtilisateur.update(res.id, res, (status) => {
                if(status === 200)  {
                    defiController.afficheTousLesDefis(tri, res.filtrerealisation)
                }
            })
        }
    })
})