class CommentaireController   {
    constructor()   {
        this.servicesCommentaire = new ServicesCommentaire()
        this.utilisateur = null
    }

    getCommentaire(defiId)  {
        document.querySelector("#tableCommentaire").innerHTML = ""
        const servicesUtilisateur = new ServicesUtilisateur()
        servicesUtilisateur.getUtilisateurConnecte((status, res) => {
            if(status === 200)  {
                this.utilisateur = res
            }
        })
        this.servicesCommentaire.getByDefiId(defiId, (status, list) => {
            if (status === 200) {
                list.forEach((ligne) => {
                    let html = `
                    ${ligne.preuve !== null ?
                        `<div class="w-100 rounded-top border-top border-left border-right border-info">
                            <div class="row" style="padding: 15px;">
                            </div>
                        </div>` :
                        ''
                    }
                    <div class="w-100 ${ligne.preuve !== null ? 'rounded-bottom' : 'rounded'} border border-warning mb-3">  
                        <div class="row" style="padding: 15px;">
                            <div class="col-10">   
                                <p class="card-text">${ligne.texte}</p>
                            </div>
                            <div class="col-2 h-100 border-left border-warning" style="text-align: center;">  
                                ${((this.utilisateur != null) && (this.utilisateur.id === ligne.utilisateur)) ? `
                                    <button type="button" class="border-bottom border-warning btn" style="padding: 15%;" data-toggle="modal" data-target="#editCommentaire">
                                        <i class="far fa-edit" style="color: brown !important;"></i>
                                    </button>
                                <button type="button" class="btn" style="padding: 15%;" onclick="
                                    servicesCommentaire.delete(${ligne.id}, (status) => {
                                        if(status === 200)  {
                                            commentaireController.getCommentaire(location.search.substring(1).split('=')[1])
                                        }
                                    })">
                                    <i class="fas fa-minus" style="color: red !important;"></i>
                                </button>` :
                                ``}                                                  
                            </div>
                        </div>
                    </div>`

                    document.querySelector("#tableCommentaire").innerHTML += html          
                })
            } else {
                console.log(status)
            }
        })
    }
}