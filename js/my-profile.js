
document.addEventListener("DOMContentLoaded", function () {
    mostrarDatosUsuario()
    document.getElementById("btnPerfil").addEventListener('click', validaciones)
})

let primerPerfil = [];
function validaciones() {
    let nombre1 = document.getElementById("primerNombre").value
    let nombre2 = document.getElementById("SegNombre").value
    let apellido1 = document.getElementById("primerApellido").value
    let apellido2 = document.getElementById("SegApellido").value
    let contacto = document.getElementById("contacto").value
    let email = document.getElementById("e-mail").value
    let imgPerfil = document.getElementById("imgPerfil").src
    perfilesLocalStorage = JSON.parse(localStorage.getItem("perfiles"));

    const perfil = {
        primerName: nombre1,
        SegName: nombre2,
        primerApellido: apellido1,
        SegApellido: apellido2,
        contacto: contacto,
        email: email,
        img: imgPerfil,
    };
    const nuevoPerfil = Object.assign(perfil);

    if ((nombre1 == "") || (apellido1 == "") || (contacto == "")) {
        document.getElementById("validar").classList.add('was-validated')
    } else if (perfilesLocalStorage === null) {
        primerPerfil.push(nuevoPerfil)
        localStorage.setItem("perfiles", JSON.stringify(primerPerfil))
        showAlertSuccess()
    } else if (yaHayEsteElemento(perfilesLocalStorage, email)) {
        let lugar = lugarElemento(perfilesLocalStorage, email);
        perfilesLocalStorage[lugar] = nuevoPerfil;
        localStorage.setItem("perfiles", JSON.stringify(perfilesLocalStorage))
        showAlertSuccess()
    } else {
        perfilesLocalStorage.push(nuevoPerfil);
        localStorage.setItem("perfiles", JSON.stringify(perfilesLocalStorage))
        showAlertSuccess()
    }
}

function yaHayEsteElemento(array, dato) {
    for (var i = 0; i < array.length; i++) {
        if (dato === array[i].email) {
            return true
        }
    }
}

function lugarElemento(array, dato) {
    for (var i = 0; i < array.length; i++) {
        if (dato === array[i].email) {
            return i
        }
    }
}

function mostrarDatosUsuario() {
    let email_json = JSON.parse(localStorage.getItem("email"));
    perfilesGuardados = JSON.parse(localStorage.getItem("perfiles"));

    if (perfilesGuardados !== null) {
        if (yaHayEsteElemento(perfilesGuardados, email_json)) {
            const numElemento = (element) => element.email === email_json;
            let pos = perfilesGuardados.findIndex(numElemento)
            document.getElementById("primerNombre").value = perfilesGuardados[pos].primerName
            document.getElementById("SegNombre").value = perfilesGuardados[pos].SegName
            document.getElementById("primerApellido").value = perfilesGuardados[pos].primerApellido
            document.getElementById("SegApellido").value = perfilesGuardados[pos].SegApellido
            document.getElementById("contacto").value = perfilesGuardados[pos].contacto
            document.getElementById("e-mail").value = perfilesGuardados[pos].email
            document.getElementById("imgPerfil").src = perfilesGuardados[pos].img
        } else {
            document.getElementById("e-mail").value = email_json
        }
    } else {
        document.getElementById("e-mail").value = email_json
    }
}

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

document.getElementById("fotoPerfil").addEventListener("change", function (e) {
    let file = this.files[0];
    let reader = new FileReader();
    let imgPerfil = document.getElementById("imgPerfil")
    reader.readAsDataURL(file)

    reader.onload = function () {
        imgPerfil.src = reader.result
    };

    reader.onerror = function () {
        alert("Error al cargar la imagen, intente de nuevo")
    };
})