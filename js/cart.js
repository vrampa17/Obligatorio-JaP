let listado = []

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            agregarProdCarrito()
        }
    })
})

function agregarProdCarrito() {

    let agregarHtml = "";

    let nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));

    if (nuevoProd !== null) {

        for (let i = 0; i < nuevoProd.length; i++) {

            agregarHtml += `
            <tr> 
                <th scope="row" class="col">
                  <img src="${nuevoProd[i].image}" alt="imgProd" class="img-thumbnail">
                </th>
                <td class="col-3">${nuevoProd[i].name}</td>
                <td id="precio" class="col-3">${nuevoProd[i].currency} ${nuevoProd[i].unitCost}</td>
                <td class="col-3"><input type="number" name="${nuevoProd[i].name}" class="form-control cantPrd" value="${nuevoProd[i].count}" min="1" id="cantProdPrueb"></td>
                <td class="col"><strong id="costoFinal${nuevoProd[i].id}">${nuevoProd[i].currency}${parseInt(nuevoProd[i].unitCost) * parseInt(nuevoProd[i].count)}</strong></td>
                <td class="col"><button type="button" onclick="eliminarCarrito(${i})" name="${nuevoProd[i].name}" class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg></button></td>
            </tr>
        `
        }
        document.getElementById("agregarNewProds").innerHTML = agregarHtml;
    }

    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => {
            const isLargeNumber = (element) => element.name === input.name;
            let lugar = nuevoProd.findIndex(isLargeNumber)
            nuevoProd[lugar].count = input.value;
            localStorage.setItem("nuevoProd", JSON.stringify(nuevoProd));
            agregarProdCarrito()
        })
    })
    actualizarTotalCosto()
}

function eliminarCarrito(elemnt) {
    let actualizoDatos = JSON.parse(localStorage.getItem("nuevoProd"));
    actualizoDatos.splice(elemnt, 1)
    carrito_json = JSON.stringify(actualizoDatos);
    localStorage.setItem("nuevoProd", carrito_json);
    agregarProdCarrito()
}

let check1 = document.getElementById("check1");
let check2 = document.getElementById("check2");
let check3 = document.getElementById("check3");
let comisionEnvio = 0.05;


check1.addEventListener("change", validaCkeck1)
check2.addEventListener("change", validaCkeck2)
check3.addEventListener("change", validaCkeck3)

function validaCkeck1() {
    comisionEnvio = 0.15;
    actualizarTotalCosto()
}

function validaCkeck2() {
    comisionEnvio = 0.07;
    actualizarTotalCosto()
}

function validaCkeck3() {
    comisionEnvio = 0.05;
    actualizarTotalCosto()
}

function calcularSubTotal() {
    let nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));

    let sumatoria = 0;
    for (let i = 0; i < nuevoProd.length; i++) {
        if (nuevoProd[i].currency === "USD") {
            sumatoria = sumatoria + (parseInt(nuevoProd[i].unitCost) * parseInt(nuevoProd[i].count))
        } else {
            sumatoria = sumatoria + ((parseInt(nuevoProd[i].unitCost) * parseInt(nuevoProd[i].count)) / 40)
        }
    }
    return sumatoria
}

function actualizarTotalCosto() {
    let comision = (comisionEnvio * calcularSubTotal())
    let subtotal = calcularSubTotal()
    let total = subtotal + comision

    document.getElementById("precioComision").innerHTML = "USD " + comision.toFixed(1)
    document.getElementById("precioSubtotal").innerHTML = "USD " + subtotal.toFixed(1)
    document.getElementById("precioTotal").innerHTML = "USD " + total.toFixed(1)
}

let datosCredit1 = document.getElementById("datosCredit1")
let datosCredit2 = document.getElementById("datosCredit2")
let datosCredit3 = document.getElementById("datosCredit3")
let datosDebit = document.getElementById("datosDebit")
let credito = document.getElementById("formaDePagoCredit")
let debito = document.getElementById("formaDePagoDebit")

function requiredCredito() {
    datosCredit1.required = true;
    datosCredit2.required = true;
    datosCredit3.required = true;
    datosDebit.required = false;
}
function inhabilitarCamposDebito() {
    datosCredit1.disabled = false;
    datosCredit2.disabled = false;
    datosCredit3.disabled = false;
    datosDebit.disabled = true;
}
function vaciarCamposDebito() {
    datosDebit.value = "";
}
credito.addEventListener('click', function (e) {
    inhabilitarCamposDebito()
    requiredCredito()
    vaciarCamposDebito()
    document.getElementById("mensajeFormPagoSelec").innerHTML = "Tarjeta de credito"
});

function requiredDebit() {
    datosCredit1.required = false;
    datosCredit2.required = false;
    datosCredit3.required = false;
    datosDebit.required = true;
}
function inhabilitarCamposCredito() {
    datosCredit1.disabled = true;
    datosCredit2.disabled = true;
    datosCredit3.disabled = true;
    datosDebit.disabled = false;
}
function vaciarCamposCredito() {
    datosCredit1.value = "";
    datosCredit2.value = "";
    datosCredit3.value = "";
}
function validarCamposModal() {
    if (((credito.checked == true) && (datosCredit3.value === "" || datosCredit1.value === "" || datosCredit2.value === "")) || (debito.checked == true && datosDebit.value === "")) {
        document.getElementById("validModal").innerHTML = ` <p class="text-danger">Debe completar los campos de la forma de pago seleccionada</p>`
    } else {
        document.getElementById("validModal").innerHTML = ""
    }
}
debito.addEventListener('click', function (e) {
    vaciarCamposCredito()
    inhabilitarCamposCredito()
    requiredDebit()
    document.getElementById("mensajeFormPagoSelec").innerHTML = "Transferencia bancaria"
});

function validoCantArti() {
    let prod = JSON.parse(localStorage.getItem("nuevoProd"));
    let hay0Articulos = false
    if (prod !== null) {
        for (let i = 0; i < prod.length; i++) {
            if (prod[i].count == 0) {
                hay0Articulos = true
            }
        }
    } else {
        hay0Articulos = true
    }
    return hay0Articulos
}

let boton = document.getElementById("regBtn");
var form = document.getElementById("form");

boton.addEventListener('click', function () {

    if (!form.checkValidity()) {
        document.getElementById("form").classList.add('was-validated')
    } else if (validoCantArti()) {
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            showAlertError()
        })
    } else {
        form.submit()
    }
})

form.addEventListener('submit', (event) => {
    if (!validoCantArti()) {
        showAlertSuccess()
    }
})

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}


