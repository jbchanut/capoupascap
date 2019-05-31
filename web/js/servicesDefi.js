class ServicesDefi extends Service   {
    constructor() {
        super("/defi")
    }

    getByUtilisateurId(id, done) {
        ajax("GET", this.serviceUrl + "/utilisateur/" + id, done)
    }
}