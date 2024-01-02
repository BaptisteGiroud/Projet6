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
        removedProject()
        } else {
            gallery.insertAdjacentHTML("beforeend", `
            <figure>
            <img src="${imageUrl}" alt="${title}">
            <figcaption>${title}</figcaption>
            </figure>`)
        }
    }
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

function closeModal(){
    modalModule.classList.add("modalSlideOff")
    modal.classList.add("modalDisappear")
    cleansFormPost()
    window.setTimeout(function (){
        modal.classList.add("hidden")
        /* Retour first Modal */
        modalContent.classList.remove("hidden")
        content_addWork.classList.add("hidden")
        returnModalGallery.classList.add("masked") 
    }, 300)    
}

function cleansFormPost() {
    document.getElementById("previewImg").src = ""
    document.getElementById("imgfile").value = ""
    imgTitle.value = ""
    imgFile.style.zIndex = "0"
}

markEdition.addEventListener("click", (event) => {
    closeModal()
})

document.addEventListener("click", (event) => {
    if (event.target == modal) {
        closeModal()   
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
                headers: {"Authorization": `Bearer ${token}`},
            })
            buttonSup.parentElement.remove()
            getProjects().then((works) => {
                cleansPortfolio()
                displayPortfolio(works)
            })
        })
    })
}

// Add Project //

let buttonAddPhoto = document.getElementById("add_photo")
let content_addWork = document.querySelector(".content_addWork")
let returnModalGallery = document.querySelector(".fa-arrow-left")
let selectCategories = document.getElementById("selectCategory")
let imgTitle = document.getElementById("imgtitle")

let imgCategory = document.getElementById("selectCategory")
let imgFile = document.getElementById("imgfile")
let btnValid = document.getElementById("send_request")
let spanTitle = document.querySelector(".inputTitle")

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
        cleansFormPost()        
    })


    /* Ajout Options SelectBar Category */
    for (i = 0; i < categories.length; i++){
    selectCategories.insertAdjacentHTML("beforeend", `
    <option value="${categories[i].id}">${categories[i].name}</option>`)
    }

    
    /** Preview Img */
    imgFile.addEventListener("change", () => {
    previewFile()
    })


    /** Gestion Form */
    btnValid.addEventListener("click", () => {
        let imgFile = document.getElementById("imgfile")
        let file = imgFile.files
        if (imgFile.files.length === 0 || file[0].type !== "image/png" || file[0].size >= 4000000){
            imgFile.classList.add("errorImg")
            console.log("Fichier manquant")
        } else {
            imgFile.classList.remove("errorImg")  
        }
        if (imgTitle.value == ""){
            imgTitle.classList.add("errorTitle", "errorTitleDiv")
            spanTitle.classList.add("errorTitleDiv")
            console.log("Titre manquant")
        } else {
            imgTitle.classList.remove("errorTitle")
            spanTitle.classList.remove("errorTitleDiv")
        }
        if (imgFile.files.length !== 0 && imgTitle.value != ""){
            postRequest()
        }
    })
}

function previewFile() {
    let imgFile = document.getElementById("imgfile")
    let file = imgFile.files
    if (file.length > 0){
        let reader = new FileReader()

        reader.onload = function (event) {
            document.getElementById("previewImg").setAttribute("src", reader.result)
            imgFile.style.zIndex = "3"
        }
        
        reader.readAsDataURL(file[0])
    } else {
        document.getElementById("previewImg").setAttribute("src", "")
        imgFile.style.zIndex = "0"
    }
}


async function postRequest() {
    let imgFileAdd = document.getElementById("imgfile").files[0]

    let formDataAdd = new FormData()
    formDataAdd.append("image", imgFileAdd)
    formDataAdd.append("title", imgTitle.value)
    formDataAdd.append("category", parseInt(imgCategory.value))

    let responseRequest = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`},
        body: formDataAdd
    }).then(response => {
        if (response.ok){
            modalContent.classList.remove("hidden")
            content_addWork.classList.add("hidden")
            returnModalGallery.classList.add("masked")
            cleansFormPost()     
            getProjects().then((works) => {
                cleansPortfolio()
                displayPortfolio(works)
                cleansPortfolio(true)
                displayPortfolio(works, true)
            })
            alert("Post réussi !")
        } else {
            alert("Echec du Post")
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

