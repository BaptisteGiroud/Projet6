// Get projects // 

let gallery = document.querySelector(".gallery")
let buttonsFilters = document.querySelectorAll(".filters input")

function cleansPortfolio(){
    gallery.innerHTML=""
}

function displayPortfolio(works){
    for (i = 0; i < works.length; i++){
        let imageUrl = works[i].imageUrl
        let title = works[i].title
        gallery.insertAdjacentHTML("beforeend", `
        <figure>
        <img src="${imageUrl}" alt="${title}">
        <figcaption>${title}</figcaption>
        </figure>`)
    }
}

async function getProjects(){
    let works = await fetch("http://localhost:5678/api/works").then(res =>
    res.json())
    displayPortfolio(works)

    buttonsFilters.forEach((buttonsFilters) => {
            buttonsFilters.addEventListener("click", (event) => {
                let filters = works.filter(function (works){
                    return event.currentTarget.dataset.category == parseInt(works.category.id);
                })
                if (event.currentTarget.dataset.category == "null"){
                    location.reload()
                }
            cleansPortfolio()
            displayPortfolio(filters)
        })
    })
}

// Edition mode //

let localStorage = window.localStorage.length
token = window.localStorage.getItem("token")
let elementsEdit = document.querySelectorAll("body .id_edit")
let modal = document.querySelector(".background")
let modalModule = document.querySelector(".edition_gallery")
let modalContent = document.querySelector(".content_gallery")

let btnEdition = document.querySelector(".modify")
let markEdition = document.querySelector(".fa-xmark")


if ((token == "undefined") || (localStorage == 0)){
    console.error("Login failed")
    for (i = 0; i < elementsEdit.length; i++){
        elementsEdit[i].classList.add("hidden")
        modal.classList.add("hidden")
    }
} else {
    console.log("Login success")
    for (i = 0; i < elementsEdit.length; i++){
        elementsEdit[i].classList.remove("hidden")
        modal.classList.add("hidden")
    }
}

// Open close Modal //

btnEdition.addEventListener("click", (event) => {
    modal.classList.remove("hidden")
})

markEdition.addEventListener("click", (event) => {
    modal.classList.add("hidden")
})

document.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.classList.add("hidden")
    }
})


// MAIN // 

cleansPortfolio()
getProjects()



/** Filters **/

// let btnTous = document.getElementById("tous")
// let btnObjets = document.getElementById("objets")
// let btnAppartements = document.getElementById("appartements")
// let btnHotelRestaurants = document.getElementById("hotels_restaurants")



// async function filterTous(works){
//     let btnTousFilter = btnTous.addEventListener("click", function () {
//         let tous = projectsListe.filter(function (projectsListe){
//             return projectsListe.id >= 0;
//         })
//         cleansPortfolio()
//         displayPortfolio(tous)
//     })
// }

// async function filterObjets(works){
//     projectsListe = await works
//     let btnObjetsFilter = btnObjets.addEventListener("click", function () {
//         let objets = projectsListe.filter(function (projectsListe){
//             return projectsListe.category.name == "Objets";
//         })
//         cleansPortfolio()
//         displayPortfolio(objets)
//     })
// }

// async function filterAppart(works){
//     projectsListe = await works
//     let btnAppartementsFilter = btnAppartements.addEventListener("click", function () {
//         let appartements = projectsListe.filter(function (projectsListe){
//             return projectsListe.category.name == "Appartements";
//         })
//         cleansPortfolio()
//         displayPortfolio(appartements)
//     })
// }

// async function filterHotelsRestau(works){
//     projectsListe = await works
//     let btnHotelRestauFilter = btnHotelRestaurants.addEventListener("click", function () {
//         let hotelsRestau = projectsListe.filter(function (projectsListe){
//             return projectsListe.category.name == "Hotels & restaurants";
//         })
//         cleansPortfolio()
//         displayPortfolio(hotelsRestau)
//     })
// }

