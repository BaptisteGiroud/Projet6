// Get projects // 

let gallery = document.querySelector(".gallery")

function cleansPortfolio(){
    gallery.innerHTML=""
}

async function getProjects(){
    let works = await fetch("http://localhost:5678/api/works").then(res =>
    res.json())
    for (i = 0; i < works.length; i++){
        let imageUrl = works[i].imageUrl
        let title = works[i].title
        gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
    }
    filterTous(works)
    filterObjets(works)
    filterAppart(works)
    filterHotelsRestau(works)
}

cleansPortfolio()
getProjects()

/** Filters **/

let btnTous = document.getElementById("tous")
let btnObjets = document.getElementById("objets")
let btnAppartements = document.getElementById("appartements")
let btnHotelRestaurants = document.getElementById("hotels_restaurants")


async function filterTous(works){
    projectsListe = await works
    let btnTousFilter = btnTous.addEventListener("click", function () {
        let tous = projectsListe.filter(function (projectsListe){
            return projectsListe.id >= 0;
        })
        console.log(tous)
        cleansPortfolio()
        for (i = 0; i < tous.length; i++){
            let imageUrl = tous[i].imageUrl
            let title = tous[i].title
            gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
        }
    })
}

async function filterObjets(works){
    projectsListe = await works
    let btnObjetsFilter = btnObjets.addEventListener("click", function () {
        let objets = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Objets";
        })
        console.log(objets)
        cleansPortfolio()
        for (i = 0; i < objets.length; i++){
            let imageUrl = objets[i].imageUrl
            let title = objets[i].title
            gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
        }
    })
}

async function filterAppart(works){
    projectsListe = await works
    let btnAppartementsFilter = btnAppartements.addEventListener("click", function () {
        let appartements = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Appartements";
        })
        console.log(appartements)
        cleansPortfolio()
        for (i = 0; i < appartements.length; i++){
            let imageUrl = appartements[i].imageUrl
            let title = appartements[i].title
            gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
        }
    })
}

async function filterHotelsRestau(works){
    projectsListe = await works
    let btnHotelRestauFilter = btnHotelRestaurants.addEventListener("click", function () {
        let hotelsRestau = projectsListe.filter(function (projectsListe){
            return projectsListe.category.name == "Hotels & restaurants";
        })
        console.log(hotelsRestau)
        cleansPortfolio()
        for (i = 0; i < hotelsRestau.length; i++){
            let imageUrl = hotelsRestau[i].imageUrl
            let title = hotelsRestau[i].title
            gallery.insertAdjacentHTML("beforeend", `<figure><img src="${imageUrl}" alt="${title}"><figcaption>${title}</figcaption></figure>`)
        }
    })
}

