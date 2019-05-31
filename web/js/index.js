class IndexController   {
    constructor()   {
        this.list = new ListService()
    }


    displayAllLists()   {
        document.querySelector("#tableCourses").innerHTML = ""
        this.listServices.getAll((status, lists) => {
            if(status == 200) {
                lists.forEach((ligne) => {
                    let html = `<ul><div class="row"><div class="col-1"></div><div class="col-1"><input type="checkbox" 
                    onclick=" const s = new ListService(); s.get(${ligne.id}, (status, l) => {
                        if(status === 200)  {
                            l.archived = !(l.archived)
                            s.update(l.id, l, (status) => {
                                if(status != 200)   console.log(status)
                            })
                        }   else    {
                            console.log(status)
                        }                        
                    }); " `

                    if(ligne.archived)
                        html += `checked`

                    html += `/></div><div class="col-4">${ligne.shop}</div><div class="col-5">${ligne.date.toLocaleString()}</div>
                    <div class="col-1"><div class="row">
                    <button class="btn" type="button" onclick=""><i style="color: saddlebrown" class="far fa-edit"></i></button>
                    <button class="btn" type="button" onclick="let services = new ListService();
                             services.delete(${ligne.id},() => {});
                    this.closest('ul').remove()"><i style="color: red" class="fas fa-times"></i></bouton></div></div></div></ul>`

                    document.querySelector("#tableCourses").innerHTML += html
                })
            }   else    {
                console.log(status)
            }
        })
    }
}