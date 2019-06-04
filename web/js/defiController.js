class DefiController   {
    constructor()   {
        this.servicesDefi = new ServicesDefi()
        this.servicesLike = new ServicesLike()
        this.servicesDefiSauvegarde = new ServicesDefiSauvegarde()
        this.servicesUtilisateur = new ServicesUtilisateur()
    }


    afficheTousLesDefis(tri)   {
        document.querySelector("#tableDefi").innerHTML = ""
        this.servicesDefi.getAll(tri, (status, list) => {
            if (status === 200) {
                list.forEach((ligne) => {
                    let like = null
                    this.servicesLike.getLike(ligne.id, (status, res) => {
                        if(status === 200)  {
                            like = res.id
                        }
                        let nombreLike = 0
                        this.servicesLike.getNombreLike(ligne.id, (status, res) => {
                            if(status === 200)  {
                                nombreLike = res
                            }
                            if(like !== null) {
                                nombreLike--
                            }
                            let defiSauvegarde = null
                            this.servicesDefiSauvegarde.getDefiSauvegarde(ligne.id, (status, res) => {
                                if(status === 200)  {
                                    defiSauvegarde = res.id
                                }
                                this.servicesUtilisateur.getUtilisateurConnecte((status, utilisateur) => {
                                    let html = `
                                    <div class="w-100 card ${(utilisateur.id !== ligne.utilisateur) ? 'border-primary' : 'border-success'} mb-3">                          
                                        <a href="DetailDefi.html?defi=${ligne.id}">
                                            <div class="card-body text-primary>   
                                                <p class="card-text">${ligne.texte}</p>
                                            </div>
                                        </a>
                                        <div class="card-footer">
                                            <div class="row">
                                            <div class="col-12">
                                                <i class="${(like !== null) ? 'fas fa-heart' : 'far fa-heart'}" onclick="
                                                const servicesLike = new ServicesLike()
                                                servicesLike.getLike(${ligne.id}, (status, res) => {
                                                    if(status !== 200) {
                                                        servicesLike.insert(new Like(${ligne.id}), () => {
                                                            this.className = 'fas fa-heart'
                                                            this.offsetParent.childNodes[3].innerHTML = ${nombreLike + 1}  
                                                        })                                
                                                    }   else    {
                                                        servicesLike.delete(res.id, () => {
                                                            this.className = 'far fa-heart'
                                                            this.offsetParent.childNodes[3].innerHTML = ${nombreLike}  
                                                        }) 
                                                    }
                                                })"></i>
                                                <div class="col-3" style="float: left;">${like !== null ? nombreLike + 1 : nombreLike}</div>
                                                <i class="${(defiSauvegarde !== null) ? 'fas fa-save' : 'far fa-save'}" onclick="
                                                const servicesDefiSauvegarde = new ServicesDefiSauvegarde()
                                                servicesDefiSauvegarde.getDefiSauvegarde(${ligne.id}, (status, res) => {
                                                    if(status !== 200) {
                                                        servicesDefiSauvegarde.insert(new DefiSauvegarde(${ligne.id}), () => {
                                                            this.className = 'fas fa-save'
                                                        })                                
                                                    }   else    {
                                                        servicesDefiSauvegarde.delete(res.id, () => {
                                                            this.className = 'far fa-save'
                                                        }) 
                                                    }
                                                })"></i>
                                            </div>
                                            </div>
                                        </div>
                                    </div>`

                                    document.querySelector("#tableDefi").innerHTML += html   
                                })                                
                            })
                        })                        
                    })                    
                })
            } else {
                console.log(status)
            }
        })
    }
}