module.exports = class Utilisateur  {
    constructor(nom, prenom, email, motdepasse, filtrerealisation, datedecreation)   {
        this.id = null
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.motdepasse = motdepasse
        this.filtrerealisation = filtrerealisation
        this.datedecreation = datedecreation
    }
}