// Get projects // 

let gallery = document.querySelector(".gallery")
let galleryModal = document.querySelector(".grid")
let filters = document.querySelector(".filters")

function cleansPortfolio( isEdit = false){
    if (isEdit){
        galleryModal.innerHTML = ""
    } else {
        gallery.innerHTML=""
    }
}

function displayFilters(categories){
    for (i = 0; i < categories.length; i++){
        let categoryId = categories[i].id
        let categoryName = categories[i].name

        filters.insertAdjacentHTML("beforeend", `
        <div class="filters_btn">
		<input type="radio" name="filter" data-category="${categoryId}" id="${categoryName}">
		<label for="${categoryName}">${categoryName}</label>
		</div>`)
    }
}

function displayPortfolio(works, isEdit = false){
    for (i = 0; i < works.length; i++){
        let imageUrl = works[i].imageUrl
        let title = works[i].title
        let workId = works[i].id
        
        if (isEdit){
            galleryModal.insertAdjacentHTML("beforeend", `
            <figure data-id="${workId}">
            <i class="fa-solid fa-trash-can fa-xs removedProject"></i>
            <img src="${imageUrl}" alt="${title}">
            </figure>`)
        
        } else {
            gallery.insertAdjacentHTML("beforeend", `
            <figure>
            <img src="${imageUrl}" alt="${title}">
            <figcaption>${title}</figcaption>
            </figure>`)
        }
    }
    // removedProject()
}

async function getProjects(){
    return await fetch("http://localhost:5678/api/works").then(res =>
    res.json())
}

async function getCategories(){
    return await fetch("http://localhost:5678/api/categories").then(res =>
    res.json())
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

let logInOut = document.getElementById("logInOut")
let header = document.querySelector("header")


if (token == null){
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
    header.classList.add("headerEdition")
    logInOut.innerHTML = `<li id="logInOut"><a href="./login.html">logout</a></li>`
}

// Open close Modal //

btnEdition.addEventListener("click", (event) => {
    modal.classList.remove("hidden","modalDisappear")
    modalModule.classList.remove("modalSlideOff")
    getProjects().then((works) => {
        cleansPortfolio(true)
        displayPortfolio(works, true)
    })
})

markEdition.addEventListener("click", (event) => {
    modalModule.classList.add("modalSlideOff")
    modal.classList.add("modalDisappear")
    window.setTimeout(function (){
        modal.classList.add("hidden")
        /* Retour first Modal */
        modalContent.classList.remove("hidden")
        content_addWork.classList.add("hidden")
        returnModalGallery.classList.add("masked") 
    }, 300)   
})

document.addEventListener("click", (event) => {
    if (event.target == modal) {
        modalModule.classList.add("modalSlideOff")
        modal.classList.add("modalDisappear")
        window.setTimeout(function (){
            modal.classList.add("hidden")
            /* Retour first Modal */
            modalContent.classList.remove("hidden")
            content_addWork.classList.add("hidden")
            returnModalGallery.classList.add("masked") 
        }, 300)      
    }
})

// Removed Project //

function removedProject() {
    let buttonSup = document.querySelectorAll(".removedProject")
    buttonSup.forEach((buttonSup) => {
        buttonSup.addEventListener("click", () =>{
            let selectProjectId = buttonSup.parentElement.dataset.id
            let requestRemoved = fetch(`http://localhost:5678/api/works/${selectProjectId}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`},
            })
        })
    })
}

// Add Project //

let buttonAddPhoto = document.getElementById("add_photo")
let content_addWork = document.querySelector(".content_addWork")
let returnModalGallery = document.querySelector(".fa-arrow-left")
let selectCategories = document.getElementById("selectCategory")


function addProject(categories) {
    buttonAddPhoto.addEventListener("click", (event)=> {
        modalContent.classList.add("hidden")
        content_addWork.classList.remove("hidden")
        returnModalGallery.classList.remove("masked")
    })
    returnModalGallery.addEventListener("click", ()=> {
        modalContent.classList.remove("hidden")
        content_addWork.classList.add("hidden")
        returnModalGallery.classList.add("masked")        
    })


    /* Ajout Options SelectBar Category */
    for (i = 0; i < categories.length; i++){
    selectCategories.insertAdjacentHTML("beforeend", `
    <option value="${categories[i].name}">${categories[i].name}</option>`)
    }

    /* Formulaire AddProject */
    let formDataAddPhoto = new FormData()
    let imgTitle = document.getElementById("imgtitle")
    let imgCategory = document.getElementById("selectCategory")
    let imgFile = document.getElementById("imgfile")
    let btnValid = document.getElementById("send_request")

    formDataAddPhoto.append("title", `${imgTitle.value}`)
    formDataAddPhoto.append("category", `${imgCategory.value}`)
    formDataAddPhoto.append("image", `${imgFile}.files`)


    btnValid.addEventListener("click", () => {
        if (imgFile.files.length == 0){
            imgFile.classList.add("errorImg")
        } else {
            imgFile.classList.remove("errorImg")  
        }
        if (imgTitle.value == ""){
            imgTitle.classList.add("errorTitle")
        } else {
            imgTitle.classList.remove("errorTitle")
        }
        if (imgFile.files.length != 0 && imgTitle.value != ""){
            console.log(imgFile.files)
            console.log(imgTitle.value)
            console.log(imgCategory.value)
            console.log(token)
        }
    })
}


// MAIN // 

cleansPortfolio()

getProjects().then((works) => {
    displayPortfolio(works)

    getCategories().then((categories) => {
        displayFilters(categories)
        addProject(categories)
        let buttonsFilters = document.querySelectorAll(".filters input")

        buttonsFilters.forEach((buttonsFilters) => {
            buttonsFilters.addEventListener("click", (event) => {
                let filterWorks = works
                let currentFilter = event.currentTarget

                if (currentFilter.dataset.category !== "null") {
                    filterWorks = works.filter(function (works){
                        return currentFilter.dataset.category == parseInt(works.category.id);
                    })
                }
                cleansPortfolio()
                displayPortfolio(filterWorks)
            })
        })        
    })
})



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

