class CommentaireController   {
    constructor()   {
        this.servicesCommentaire = new ServicesCommentaire()
    }

    getCommentaire(defiId)  {
        document.querySelector("#tableCommentaire").innerHTML = ""
        this.servicesCommentaire.getByDefiId(defiId, (status, list) => {
            if (status === 200) {
                list.forEach((ligne) => {
                    let html = `
                    <div class="w-100 card border border-warning mb-3">  
                        <div class="row" style="padding: 15px;">
                            <div class="col-10">   
                                <p class="card-text">${ligne.texte}</p>
                            </div>
                            <div class="col-2 h-100 border-left border-warning" style="text-align: center;">
                                <i class="fas fa-minus" style="color: red !important; margin-top: 50%;" onclick="
                                servicesCommentaire.delete(${ligne.id}, (status) => {
                                    if(status === 200)  {
                                        commentaireController.getCommentaire(location.search.substring(1).split('=')[1])
                                    }
                                })
                                "></i>
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