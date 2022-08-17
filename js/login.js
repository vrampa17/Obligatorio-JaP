document.getElementById("logBtn").addEventListener("click", function () {
    var pass1 = document.getElementById("password");
    var email = document.getElementById("email");

    //los campos de texto no pueden estar vacios
    if((pass1.value == "")||(email.value == "")){      
    alert("Completar campos")
    }else{
        window.location.href = "https://vrampa17.github.io/Obligatorio-JaP/inicio";
    }
}
);
