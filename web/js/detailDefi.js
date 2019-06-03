const servicesLike = new ServicesLike()
const servicesDefiSauvegarde = new ServicesDefiSauvegarde()
const servicesDefi = new ServicesDefi()
const parameters = location.search.substring(1).split("=")
console.log(parameters)

if(parameters[0] === "defi")  {
    servicesLike.getLike(parameters[1], (status) => {
        if(status === 200)  {
            console.log(status)
            document.querySelector("#like").childNodes[0].className = 'fas fa-heart'
        }   else    {
            document.querySelector("#like").childNodes[0].className = 'far fa-heart'
        }
    })
    
    servicesDefiSauvegarde.getDefiSauvegarde(parameters[1], (status) => {
        if(status === 200)  {
            console.log(status)
            document.querySelector("#sauvegarde").childNodes[0].className = 'fas fa-save'
        }   else    {
            document.querySelector("#sauvegarde").childNodes[0].className = 'far fa-save'
        }
    })

    servicesDefi.get(parameters[1], (status, res) => {
        if(status === 200)
            document.querySelector("#textDefi").innerHTML=res.texte
    })
}   else    {
    location.pathname = "/Defi.html"
}

document.querySelector("#like").addEventListener("click", () => {
    servicesLike.getLike(parameters[1], (status, res) => {
        console.log('like ' + status)
        if(status === 200)  {
            servicesLike.delete(res.id, (status) => {
                console.log('delete like ' + status)
                if(status === 200)  {
                    document.querySelector("#like").childNodes[0].className = 'far fa-heart'
                }
            })            
        }   else    {
            servicesLike.insert(new Like(parameters[1]), (status) => {
                console.log('insert like ' + status)
                if(status === 200)  {
                    document.querySelector("#like").childNodes[0].className = 'fas fa-heart'
                }
            })            
        }
    })
})

document.querySelector("#sauvegarde").addEventListener("click", () => {
    servicesDefiSauvegarde.getDefiSauvegarde(parameters[1], (status, res) => {
        console.log('like ' + status)
        if(status === 200)  {
            servicesDefiSauvegarde.delete(res.id, (status) => {
                console.log('delete sauv ' + status)
                if(status === 200)  {
                    document.querySelector("#sauvegarde").childNodes[0].className = "far fa-save"
                }
            })            
        }   else    {
            servicesDefiSauvegarde.insert(new DefiSauvegarde(parameters[1]), (status) => {
                console.log('insert sauv ' + status)
                if(status === 200)  {
                    document.querySelector("#sauvegarde").childNodes[0].className = "fas fa-save"
                }
            })   
        }
    })
})