module.exports = class Commentaire  {
    constructor(utilisateur, defi, preuve, valide, texte, datedecreation)   {
        this.id = null
        this.utilisateur = utilisateur
        this.defi = defi
        this.preuve = preuve
        this.valide = valide
        this.texte = texte
        this.datedecreation = datedecreation
    }
}