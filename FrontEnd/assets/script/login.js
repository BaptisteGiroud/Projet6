loginStatus = document.getElementById("loginStatus")

if (window.localStorage.length !== 0){
    window.localStorage.removeItem("token")
    loginStatus.innerText = "Vous avez été déconnecté"
}

let loginButton = document.querySelector(" .btn")
let passwordInput = document.getElementById("password")
let emailInput = document.getElementById("email")


// Login request //

async function loginRequest(){
    let loginForm = {
        "email" : emailInput.value,
        "password" : passwordInput.value
    }
    let chargeUtile = JSON.stringify(loginForm)


    return await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile,
    }).then(resp => resp.json())
}

/** Main **/

loginButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (emailInput.value === "" || passwordInput.value === ""){    
        loginStatus.innerText = "Champs invalides ou manquants"
    } else {
        loginStatus.innerText = ""
        loginRequest().then((response) => {
            if (response.error || response.message){
                // alert("Echec de connexion")
                animationEchec()
            } else {
                window.localStorage.setItem("token", response.token)
                location = "./index.html"
            }
        })
    }
})

function animationEchec(){
    passwordInput.classList.add("loginFailed")
    emailInput.classList.add("loginFailed")
    window.setTimeout(function (){
        passwordInput.classList.remove("loginFailed")
        emailInput.classList.remove("loginFailed")
    }, 500) 
}
