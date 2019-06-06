const defiController = new DefiController()
const servicesUtilisateur = new ServicesUtilisateur()
const servicesDefi = new ServicesDefi()
const parameters = location.search.substring(1).split("=")

if(parameters[0] === "id")  {
    servicesUtilisateur.get(parameters[1], (status, res) => {
        if(status === 200)
            document.querySelector("#titre").innerHTML = res.nom + " " + res.prenom
            document.querySelector(".container").removeChild(document.querySelector("#infoProfil"))
        
            defiController.afficheDefisUtilisateur(res.id)
    })
}   else    {
    servicesUtilisateur.getUtilisateurConnecte((status, res) => {
        if(status === 200)  {
            document.querySelector("#nomInput").value = res.nom
            document.querySelector("#prenomInput").value = res.prenom
            document.querySelector("#emailInput").value = res.email
            document.querySelector("#mdpInput").value = ""
        }
    })
    defiController.afficheDefisProfil()

    document.querySelector("#modalModificationBtn").addEventListener("click", () => {
        servicesUtilisateur.compareMdp(document.querySelector("#mdpModalInput").value, (status, res) => {
            if(status === 200)  {
                if(res) {
                    servicesUtilisateur.getUtilisateurConnecte((status, res) => {
                        if(status === 200)  {
                            if(document.querySelector("#nomInput").value !== "")
                                res.nom = document.querySelector("#nomInput").value
                            if(document.querySelector("#prenomInput").value !== "")
                                res.prenom = document.querySelector("#prenomInput").value
                            if(document.querySelector("#emailInput").value !== "")
                                res.email = document.querySelector("#emailInput").value
                            if(document.querySelector("#mdpInput").value !== "")
                                res.motdepasse = document.querySelector("#mdpInput").value
    
                            servicesUtilisateur.update(res.id, res, (status) => {
                                if(status === 200)  {                                
                                    location.pathname = '/Connexion.html'                                
                                }
                            })                        
                        }
                    })
                }   else    {
                    if(document.querySelector("#mdpModalInput").value !== "")
                        document.querySelector("#mdpModalInput").value = ""
                    document.querySelector("#toast").childNodes[1].innerHTML = 
                    "Vous avez entré un mauvais mot de passe."
                    $("#toast").toast('show') 
                }            
            }         
        })  
    })
    
    document.querySelector("#resetBtn").addEventListener("click", () => {
        servicesUtilisateur.getUtilisateurConnecte((status, res) => {
            if(status === 200)  {
                document.querySelector("#nomInput").value = res.nom
                document.querySelector("#prenomInput").value = res.prenom
                document.querySelector("#emailInput").value = res.email
                document.querySelector("#mdpInput").value = ""
            }
        })
    })
}