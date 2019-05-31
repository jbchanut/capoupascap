class ServicesDefiSauvegarde extends Service   {
    constructor() {
        super("/defiSauvegarde")
    }

    getDefiSauvegarde(defiId, done) {
        ajax("GET", this.serviceUrl + "/special/" + defiId, done)
    }
}