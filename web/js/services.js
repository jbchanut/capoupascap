class Service {
    constructor(service)   {
        this.url = new URL(window.location);
        this.serviceUrl = this.url.origin + service;
    }

    update(id, objet, done) {
        ajax("PUT", this.serviceUrl + "/" + id, done, objet)
    }
    delete(id, done) {
        ajax("DELETE", this.serviceUrl + "/" + id, done)
    }
    insert(objet, done) {
        ajax("POST", this.serviceUrl, done, objet)
    }
    get(id, done) {
        ajax("GET", this.serviceUrl + "/" + id, done)
    }
    getAll(done) {
        ajax("GET", this.serviceUrl, done)
    }
}