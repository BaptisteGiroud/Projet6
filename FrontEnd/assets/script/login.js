
window.localStorage.removeItem("token")

let loginButton = document.querySelector(" .btn")
let passwordInput = document.getElementById("password")
let emailInput = document.getElementById("email")

let token = window.localStorage.getItem("token")


// Login request //

async function loginRequest(){
    let loginForm = {
        "email" : emailInput.value,
        "password" : passwordInput.value
    }
    let chargeUtile = JSON.stringify(loginForm)


    let responseAjax =  await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: chargeUtile,
    }).then(resp => resp.json())
    .then((user) => {window.localStorage.setItem("token", user.token)})
    .then(token = window.localStorage.getItem("token"))

    document.location = "./index.html"
}

/** Main **/

loginButton.addEventListener("click", (event) => {
    event.preventDefault()
    loginRequest()
})

