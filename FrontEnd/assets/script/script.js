// Get projects // 

let gallery = document.querySelector(".gallery")

function cleansPortfolio(){
    gallery.innerHTML=""
}

async function getProjects(){
    let works = await fetch("http://localhost:5678/api/works").then(res =>
    res.json())
    console.log(works)
    for (i=0; i < works.length; i++){
        let imageUrl = works[i].imageUrl
        let title = works[i].title
        gallery.insertAdjacentHTML("afterbegin", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
    }
}

cleansPortfolio()
getProjects()

