class ServicesUtilisateur extends Service   {
    constructor() {
        super("/utilisateur")
    }

    getByEmail(email, done) {
        ajax("GET", this.serviceUrl + "/email/" + email, done)
    }

    getUtilisateurConnecte(done)    {
        ajax("GET", this.serviceUrl + "/connecte", done)
    }
}