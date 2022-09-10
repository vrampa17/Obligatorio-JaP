document.getElementById("logBtn").addEventListener("click", function () {
    var pass1 = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    let email_json = JSON.stringify(email);
    //los campos de texto no pueden estar vacios

    if ((pass1 == "") || (email == "")) {
        alert("Completar campos");
    } else {
        //guardamos el valor
        localStorage.setItem("email", email_json);
        window.location.href = "inicio.html";
    }
}
);






