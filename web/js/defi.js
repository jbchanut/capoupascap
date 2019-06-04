const defiController = new DefiController()
const servicesUtilisateur = new ServicesUtilisateur()
let tri = false


defiController.afficheTousLesDefis(tri)

document.querySelector("#tri").addEventListener("click", () => {
    tri ? tri = false : tri = true
    defiController.afficheTousLesDefis(tri)
})

document.querySelector("#filtre").addEventListener("click", () => {
    servicesUtilisateur.getUtilisateurConnecte((status, res) => {
        if(status === 200)  {
            res.filtrerealisation ? res.filtrerealisation = false : res.filtrerealisation = true

            servicesUtilisateur.update(res.id, res, (status) => {
                if(status === 200)  {
                    defiController.afficheTousLesDefis(tri)
                }
            })
        }
    })
})