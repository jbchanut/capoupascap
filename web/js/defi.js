const defiController = new DefiController()
const servicesUtilisateur = new ServicesUtilisateur()
const servicesDefi = new ServicesDefi()
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

document.querySelector("#nouveauDefiBtn").addEventListener("click", () => {
    if(document.querySelector("#nouveauDefi").value !== "" &&
        document.querySelector("#nouveauDefi").textLength <= 140) {
        servicesDefi.insert(new Defi(document.querySelector("#nouveauDefi").value), (status, res) => {
            if(status === 200)  {
                if(document.querySelector("#nouveauDefi").value !== "")
                    document.querySelector("#nouveauDefi").value = ""
                defiController.afficheTousLesDefis(tri)
                document.querySelector("#toast").childNodes[1].innerHTML = 
                "Felicitations, vous etes l'instigateur d'un nouveau défi."
                $("#toast").toast('show')
            }
        })
    }   else    {        
        document.querySelector("#toast").childNodes[1].innerHTML = 
        "Vous ne pouvez pas créer de défi sans texte ou ayant plus de 140 caractères."
        $("#toast").toast('show')
    }    
})