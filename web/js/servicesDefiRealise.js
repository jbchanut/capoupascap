class ServicesDefiRealise extends Service   {
    constructor() {
        super("/defiRealise")
    }

    getByUtilisateurId(id, done) {
        ajax("GET", this.serviceUrl + "/utilisateur/" + id, done)
    }

    getByDefiId(id, done) {
        ajax("GET", this.serviceUrl + "/defi/" + id, done)
    }

    
}