class ServicesDefi extends Service   {
    constructor() {
        super("/defi")
    }

    getByUtilisateurId(id, done) {
        ajax("GET", this.serviceUrl + "/utilisateur/" + id, done)
    }

    getAll(tri, done) {
        ajax("GET", this.serviceUrl + "/all/" + tri, done)
    }

    getAllArchives(done) {
        ajax("GET", this.serviceUrl + "/allArchives", done)
    }

    getDefiUtilisateur(done) {
        ajax("GET", this.serviceUrl + "/allUtilisateur", done)
    }
}