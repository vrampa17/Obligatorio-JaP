document.getElementById("logBtn").addEventListener("click", function () {
    var pass1 = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    console.log(email)
    let email_json = JSON.stringify(email);

    //los campos de texto no pueden estar vacios
    if ((pass1 == "") || (email == "")) {
        document.getElementById("validacionEmail").classList.add('was-validated')
        document.getElementById("validacionPass").classList.add('was-validated')
    } else {
        //guardamos el valor
        localStorage.setItem("email", email_json);
        //redireccionar al inicio
        window.location.href = "inicio.html";
    }
}
);






