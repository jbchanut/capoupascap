const servicesUtilisateur = new ServicesUtilisateur()
const nomModalInput = document.querySelector('#nomModalInput')
const prenomModalInput = document.querySelector('#prenomModalInput')
const emailModalInput = document.querySelector('#emailModalInput')
const mdpModalInput = document.querySelector('#mdpModalInput')
const parameters = location.search.substring(1)

if(parameters === "raté")   {
    document.querySelector("#toast").childNodes[1].innerHTML = 
    "Vous avez été déconnecté."
    $("#toast").toast('show')
}

document.querySelector('#saveModalBtn').addEventListener('click', () => {
    if(nomModalInput.value !== "" && prenomModalInput.value !== "" && 
        emailModalInput.value !== "" && mdpModalInput.value !== "") {
        servicesUtilisateur.getByEmail(emailModalInput.value, (status, utilisateur) => {
            if(status !== 200)   {
                servicesUtilisateur.insert(new Utilisateur(
                    nomModalInput.value, prenomModalInput.value, emailModalInput.value, mdpModalInput.value)
                , () => {
                    nomModalInput.value = ""
                    prenomModalInput.value = ""
                    emailModalInput.value = ""
                    mdpModalInput.value = ""
                    document.querySelector("#toast").childNodes[1].innerHTML = 
                    "Votre compte a bien été créé."
                    $("#toast").toast('show') 
                })
            }   else    {
                document.querySelector("#toast").childNodes[1].innerHTML = 
                "Cette email est deja prise."
                $("#toast").toast('show') 
            }
        })   
    }   else    {        
        document.querySelector("#toast").childNodes[1].innerHTML = 
        "Veuillez remplir tous les champs."
        $("#toast").toast('show') 
    }    
})