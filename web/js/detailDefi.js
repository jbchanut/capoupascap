const servicesLike = new ServicesLike()
const servicesDefiSauvegarde = new ServicesDefiSauvegarde()
const servicesDefi = new ServicesDefi()
const servicesCommentaire = new ServicesCommentaire()
const servicesUtilisateur = new ServicesUtilisateur()
const commentaireController = new CommentaireController()
const parameters = location.search.substring(1).split("=")
let nbLike = 0

if(parameters[0] === "defi")  {
    servicesDefi.get(parameters[1], (status, defi) => {
        if(status === 200)  {
            servicesUtilisateur.get(defi.utilisateur, (status, res) => {
                if(status === 200)  {
                    document.querySelector("#nomAuteur").innerHTML = res.nom + " " + res.prenom   
                    document.querySelector("#nomAuteur").href = "/Profil.html?id=" + res.id   
                }         
            }) 
            document.querySelector("#textDefi").innerHTML = defi.texte
            servicesUtilisateur.getUtilisateurConnecte((status, utilisateur) => {
                if(status === 200)  {
                    const masque = document.querySelector("#masque")
                    const supprimer = document.querySelector("#supprimer")
                    if(defi.utilisateur === utilisateur.id) {
                        if(defi.masque)  {
                            masque.childNodes[0].style.color = 'violet'
                        }   else    {
                            masque.childNodes[0].style.color = 'green'
                        }                        
                    }   else    {
                        masque.parentNode.removeChild(masque)
                        supprimer.parentNode.removeChild(supprimer)
                    }                    
                }
            })            
        }
    })

    servicesLike.getLike(parameters[1], (status) => {
        if(status === 200)  {
            document.querySelector("#like").childNodes[0].className = 'fas fa-heart'
        }   else    {
            document.querySelector("#like").childNodes[0].className = 'far fa-heart'
        }
        servicesLike.getNombreLike(parameters[1], (status, res) => {
            if(status === 200)  {
                nbLike += res
                document.querySelector("#like").childNodes[1].innerHTML = nbLike
            }
        })
    })
    
    servicesDefiSauvegarde.getDefiSauvegarde(parameters[1], (status) => {
        if(status === 200)  {
            document.querySelector("#sauvegarde").childNodes[0].className = 'fas fa-save'
        }   else    {
            document.querySelector("#sauvegarde").childNodes[0].className = 'far fa-save'
        }
    })
}   else    {
    location.pathname = "/Defi.html"
}

commentaireController.getCommentaire(parameters[1])

document.querySelector("#commentaireBtn").addEventListener("click", () => {
    if(document.querySelector("#commentaire").value !== "" &&
        document.querySelector("#commentaire").textLength <= 140)   {
            console.log(document.querySelector("#insertPreuveInput").files)
        servicesCommentaire.insert(new Commentaire(parameters[1], 
            document.querySelector("#insertPreuveInput").files, document.querySelector("#commentaire").value),
        (status) => {
            if(status === 200)  {
                if(document.querySelector("#commentaire").value !== "")
                    document.querySelector("#commentaire").value = ""
                commentaireController.getCommentaire(parameters[1])
            }
        })
    }   else    {
        document.querySelector("#toast").childNodes[1].innerHTML = 
        "Vous ne pouvvez pas faire de commentaire vide."
        $("#toast").toast('show')
    }
})

document.querySelector("#like").addEventListener("click", () => {
    servicesLike.getLike(parameters[1], (status, res) => {
        console.log(nbLike)
        if(status === 200)  {
            servicesLike.delete(res.id, (status) => {
                if(status === 200)  {
                    console.log("delete")
                    nbLike = nbLike - 1
                    document.querySelector("#like").childNodes[0].className = 'far fa-heart'
                }
            })            
        }   else    {
            servicesLike.insert(new Like(parameters[1]), (status) => {
                if(status === 200)  {
                    console.log("insert")
                    nbLike = nbLike + 1
                    document.querySelector("#like").childNodes[0].className = 'fas fa-heart'
                }
            })            
        }       
        console.log(nbLike)
        document.querySelector("#like").childNodes[1].innerHTML = nbLike
    })
})

document.querySelector("#sauvegarde").addEventListener("click", () => {
    servicesDefiSauvegarde.getDefiSauvegarde(parameters[1], (status, res) => {
        if(status === 200)  {
            servicesDefiSauvegarde.delete(res.id, (status) => {
                if(status === 200)  {
                    document.querySelector("#sauvegarde").childNodes[0].className = "far fa-save"
                }
            })            
        }   else    {
            servicesDefiSauvegarde.insert(new DefiSauvegarde(parameters[1]), (status) => {
                if(status === 200)  {
                    document.querySelector("#sauvegarde").childNodes[0].className = "fas fa-save"
                }
            })   
        }
    })
})

document.querySelector("#masque").addEventListener("click", () => {
    servicesCommentaire.getNombreCommentaire(parameters[1], (status, nbCommmentaire) => {
        if(status === 200)  {
            if(nbCommmentaire > 0) {                 
                document.querySelector("#toast").childNodes[1].innerHTML = 
                "Vous ne pouvez pas masquer un defi ayant des commentaires."
                $("#toast").toast('show')
            }   else    {
                servicesDefi.get(parameters[1], (status, defi) => {
                    if(status === 200)  {
                        defi.masque ? defi.masque = false : defi.masque = true
                        servicesDefi.update(defi.id, defi, (status) => {
                            if(status === 200)  {
                                if(defi.masque) {
                                    document.querySelector("#masque").
                                    childNodes[0].style.color = 'violet'     
                                    document.querySelector("#toast").childNodes[1].innerHTML = "Le defi est maintenant masqué."
                                    $("#toast").toast('show')
                                }   else    {
                                    document.querySelector("#masque").
                                    childNodes[0].style.color = 'green'            
                                    document.querySelector("#toast").childNodes[1].innerHTML =                             
                                    "Le defi n'est plus masqué."
                                    $("#toast").toast('show')
                                }
                            }
                        })
                    }
                })
            }
            
        }
    })
})

document.querySelector("#modalSupprimerBtn").addEventListener("click", () => {
    servicesLike.getNombreLike(parameters[1], (status, nbLike) => {
        if(status === 200)  {
            servicesCommentaire.getNombreCommentaire(parameters[1], (status, nbCommmentaire) => {
                if(status === 200)  {
                    if(nbLike > 0 || nbCommmentaire > 0) { 
                        $("#modalSupprimer").modal('hide')
                        document.querySelector("#toast").childNodes[1].innerHTML = 
                        "Vous ne pouvez pas supprimer un defi ayant des like ou commentaires."
                        $("#toast").toast('show')
                    }   else    {
                        servicesDefi.get(parameters[1], (status, defi) => {
                            if(status === 200)  {
                                servicesDefi.delete(defi.id, (status) => {
                                    if(status === 200)  {    
                                        location.pathname = "/Defi.html"                                        
                                    }
                                })
                            }
                        })
                    }
                    
                }
            })
        }
    })
})