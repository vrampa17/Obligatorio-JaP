// agregado 15 08
document.getElementById("logBtn").addEventListener("click", function () {
    var pass1 = document.getElementById("password");
    var email = document.getElementById("email");

    //debe cumplir con los siquientes requisitos: 
    //los campos de texto no pueden estar vacios
    if((pass1.value == "")||(email.value == "")){
alert("error")
    }else{
        window.location.href = "https://vrampa17.github.io/Obligatorio-JaP/inicio";
    }
}
);
// agregado 15 08
