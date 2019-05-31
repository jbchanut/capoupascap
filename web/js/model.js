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
    constructor(utilisateur, defi)   {
        this.id = null
        this.utilisateur = utilisateur
        this.defi = defi
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
    constructor(utilisateur, texte)   {
        this.id = null
        this.utilisateur = utilisateur
        this.texte = texte
        this.masque = false
        this.datedecreation = new Date()
    }
}

class DefiRealise  {
    constructor(utilisateur, defi, preuve)   {
        this.id = null
        this.utilisateur = utilisateur
        this.defi = defi
        this.preuve = preuve
        this.valide = false
    }
}

class DefiSauvegarde  {
    constructor(defi)   {
        this.id = null
        this.utilisateur = null
        this.defi = defi
    }
}