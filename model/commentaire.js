module.exports = class Commentaire  {
    constructor(utilisateur, defi, typepreuve, preuve, valide, texte, datedecreation)   {
        this.id = null
        this.utilisateur = utilisateur
        this.defi = defi
        this.typepreuve = typepreuve
        this.preuve = preuve
        this.valide = valide
        this.texte = texte
        this.datedecreation = datedecreation
    }
}