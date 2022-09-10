let listado = []
let listadoComentarios = []
document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el prodID de la pagina
    let prodID = localStorage.getItem("prodID");
    //con la url de PRODUCT_INFO el prod id y la extensión .json formamos la url deseada para cada producto.
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data
            infoProducto()
        }
    })
})

document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el prodID de la pagina
    let prodID = localStorage.getItem("prodID");
    //con la url de PRODUCT_INFO el prod id y la extensión .json formamos la url deseada para cada producto.
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listadoComentarios = resultObj.data
            mostrarComentarios()
        }
    })
})
function infoProducto() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `
            <div class="row">            
            <h1>${listado.name}</h1>
            <hr>
            <p class="mb-1 fw-bold">Precio</p>
            <p>${listado.currency} ${listado.cost}</p>
            <p class="mb-1 fw-bold">Descripción</p>
            <p>${listado.description} </p>
            <p class="mb-1 fw-bold">Categoria</p>
            <p>${listado.category} </p>
            <p class="mb-1 fw-bold">Cantidad de vendidos</p>
            <p>${listado.soldCount} </p>
            <p class="mb-3 fw-bold">Imagenes ilustrativas</p>
            <div>
            `
    document.getElementById("info").innerHTML = htmlContentToAppend;

    let mostrarImagenes = "";
    for (let img of listado.images) {
        mostrarImagenes += `
        <div class="col">
            <img src="${img}" alt="imgProducto" class="img-thumbnail">
        </div>
        `
    }
    document.getElementById("img").innerHTML = mostrarImagenes;
}

function mostrarComentarios() {
    let agregarHTML = "";

    agregarHTML += `
            <h3 class="mb-3 mt-4">Comentarios</h3>
    `
    for (let comentario of listadoComentarios) {
        agregarHTML += `
        <li class="list-group-item">
            <p class="mb-1"><span class="fw-bold">${comentario.user}</span> . ${comentario.dateTime} . ${mostrarEstrellas(comentario.score)}</p>
            <p class="mb-1">${comentario.description}</p>
        </li>
        `
    }
    document.getElementById("comentarios").innerHTML = agregarHTML;
}

document.getElementById("enviarComentario").addEventListener('click', function () {
    var puntuacion = document.getElementById("puntuacion").value;
    var comentario = document.getElementById("comentario").value;
    //mostrar hora y fecha
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    let agregarComentario = "";

    agregarComentario += `
        <li class="list-group-item">
            <p class="mb-1"><span class="fw-bold">${email_json}</span> . ${fechaYHora} . ${mostrarEstrellas(puntuacion)}</p>
            <p class="mb-1">${comentario}</p>
        </li>
    `
    document.getElementById("agregarNuevoComentario").innerHTML += agregarComentario;
})
// una forma de hacer las estrellas
// function mostrarEstrellas(puntuacion) {
//     let estrellaChequead = '<span class="fa fa-star checked"></span>';
//     let estrellaNotChequead = '<span class="fa fa-star"></span>';
//     let PuntFinal = estrellaChequead.repeat(puntuacion) + estrellaNotChequead.repeat(5 - puntuacion);

//     return (PuntFinal);
// }

// funcion mostrar estrellas
function mostrarEstrellas(puntuacion) {
    let agregar = "";
    for (let recoorrido = 1; recoorrido < 6; recoorrido++) {
        if (recoorrido <= puntuacion) {
            agregar +=
                '<span class="fa fa-star checked"></span>'
        }
        else {
            agregar += '<span class="fa fa-star"></span>'
        }
    }
    return (agregar);
}