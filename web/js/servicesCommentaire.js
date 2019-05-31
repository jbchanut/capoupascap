class ServicesCommentaire extends Service   {
    constructor() {
        super("/commentaire")
    }

    getByUtilisateurId(id, done) {
        ajax("GET", this.serviceUrl + "/utilisateur/" + id, done)
    }

    getByDefiId(id, done) {
        ajax("GET", this.serviceUrl + "/defi/" + id, done)
    }
}