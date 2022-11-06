
document.addEventListener("DOMContentLoaded", function () {
    let email_json = JSON.parse(localStorage.getItem("email"));
    let email = document.getElementById("e-mail")
    email.value = email_json
})