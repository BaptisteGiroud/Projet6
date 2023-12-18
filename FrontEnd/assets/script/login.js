
window.localStorage.removeItem("token")

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
    loginRequest().then((response) => {
        if (response.error || response.message){
            alert("Login failed")
        } else {
            window.localStorage.setItem("token", response.token)
            location = "./index.html"
        }
    })
})

