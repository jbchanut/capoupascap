const servicesUtilisateur = new ServicesUtilisateur()
const nomModalInput = document.querySelector('#nomModalInput')
const prenomModalInput = document.querySelector('#prenomModalInput')
const emailModalInput = document.querySelector('#emailModalInput')
const mdpModalInput = document.querySelector('#mdpModalInput')

document.querySelector('#saveModalBtn').addEventListener('click', () => {
    servicesUtilisateur.getByEmail(emailModalInput.value, (status, utilisateur) => {
        if(status == 404)   {
            servicesUtilisateur.insert(new Utilisateur(
                nomModalInput.value, prenomModalInput.value, emailModalInput.value, mdpModalInput.value)
            , () => {
                nomModalInput.value = ""
                prenomModalInput.value = ""
                emailModalInput.value = ""
                mdpModalInput.value = ""
                $('#inscriptionModal').modal('hide')
            })
        }   else    {
            emailModalInput
            console.log('ya un toast ici')
            $('#erreurEmailToast').toast('show')
        }
    })   
})