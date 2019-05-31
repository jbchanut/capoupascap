class ServicesLike extends Service   {
    constructor() {
        super("/like")
    }

    getLike(defiId, done) {
        ajax("GET", this.serviceUrl + "/special/" + defiId, done)
    }

    getNombreLike(defiId, done) {
        ajax("GET", this.serviceUrl + "/count/" + defiId, done)
    }
}