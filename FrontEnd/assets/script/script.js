// Get projects // 

let gallery = document.querySelector(".gallery")

function cleansPortfolio(){
    gallery.innerHTML=""
}

function displayPortfolio(works){
    for (i = 0; i < works.length; i++){
        let imageUrl = works[i].imageUrl
        let title = works[i].title
        gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
    }
}

async function getProjects(){
    let works = await fetch("http://localhost:5678/api/works").then(res =>
    res.json())
    displayPortfolio(works)

    filterTous(works)
    filterObjets(works)
    filterAppart(works)
    filterHotelsRestau(works)
}


// MAIN // 

cleansPortfolio()
getProjects()



/** Filters **/

let btnTous = document.getElementById("tous")
let btnObjets = document.getElementById("objets")
let btnAppartements = document.getElementById("appartements")
let btnHotelRestaurants = document.getElementById("hotels_restaurants")



async function filterTous(works){
    let btnTousFilter = btnTous.addEventListener("click", function () {
        let tous = projectsListe.filter(function (projectsListe){
            return projectsListe.id >= 0;
        })
        cleansPortfolio()
        displayPortfolio(tous)
    })
}

async function filterObjets(works){
    projectsListe = await works
    let btnObjetsFilter = btnObjets.addEventListener("click", function () {
        let objets = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Objets";
        })
        cleansPortfolio()
        displayPortfolio(objets)
    })
}

async function filterAppart(works){
    projectsListe = await works
    let btnAppartementsFilter = btnAppartements.addEventListener("click", function () {
        let appartements = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Appartements";
        })
        cleansPortfolio()
        displayPortfolio(appartements)
    })
}

async function filterHotelsRestau(works){
    projectsListe = await works
    let btnHotelRestauFilter = btnHotelRestaurants.addEventListener("click", function () {
        let hotelsRestau = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Hotels & restaurants";
        })
        cleansPortfolio()
        displayPortfolio(hotelsRestau)
    })
}

