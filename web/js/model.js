class Utilisateur  {
    constructor(nom, prenom, email, motdepasse)   {
        this.id = null
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.motdepasse = motdepasse
        this.filtrerealisation = false
        this.datedecreation = new Date()
    }
}

class Commentaire  {
    constructor(defi, preuve, texte)   {
        this.id = null
        this.utilisateur = null
        this.defi = defi
        this.typepreuve = null
        this.preuve = preuve
        this.valide = false
        this.texte = texte
        this.datedecreation = new Date()
    }
}

class Like  {
    constructor(defi)   {
        this.id = null
        this.utilisateur = null
        this.defi = defi
    }
}

class Defi  {
    constructor(texte)   {
        this.id = null
        this.utilisateur = null
        this.texte = texte
        this.masque = false
        this.datedecreation = new Date()
    }
}

class DefiSauvegarde  {
    constructor(defi)   {
        this.id = null
        this.utilisateur = null
        this.defi = defi
    }
}