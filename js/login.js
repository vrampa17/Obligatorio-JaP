// agregado 15 08

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

document.getElementById("logBtn").addEventListener("click", function () {
    var pass1 = document.getElementById("password");
    var email = document.getElementById("email");

    //debe cumplir con los siquientes requisitos: 
    //los campos de texto no pueden estar vacios
    if((pass1.value == "")||(email.value == "")){
    alert("Los campos no pueden estar vacios")
    }else{
        window.location.href = "https://vrampa17.github.io/Obligatorio-JaP/inicio";
    }
}
);
// agregado 15 08
