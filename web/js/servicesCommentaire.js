class ServicesCommentaire extends Service   {
    constructor() {
        super("/commentaire")
    }

    getByDefiId(id, done) {
        ajax("GET", this.serviceUrl + "/defi/" + id, done)
    }

    getNombreCommentaire(defiId, done)  {
        ajax("GET", this.serviceUrl + "/count/" + defiId, done)
    }
}