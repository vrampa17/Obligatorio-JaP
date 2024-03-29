let listado = []
let listadoComentarios = []

document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el prodID de la pagina
    let prodID = localStorage.getItem("prodID");
    //con la url de PRODUCT_INFO el prod id y la extensión .json formamos la url deseada para cada producto.
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            infoProducto();
            productosRelacionados();
        }
    })
})

document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el prodID de la pagina
    let prodID = localStorage.getItem("prodID");
    // obtenemos el json sobre los comentarios de cada producto
    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listadoComentarios = resultObj.data;
            mostrarComentarios();
        }
    })
})


function infoProducto() {
    let htmlContentToAppend = "";

    htmlContentToAppend = `
            <div class="row">            
            <div class="row justify-content-between">
                 <h1 class="col-4">${listado.name}</h1>
            <div>
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
    mostrarImagenes += `
            <div class="carousel-item active">
                <img src="${listado.images[0]}" alt="imgProducto" class="d-block w-100">
            </div>
            `
    for (let i = 1; i < listado.images.length; i++) {
        mostrarImagenes += `
        <div class="carousel-item">
            <img src="${listado.images[i]}" alt="imgProducto" class="d-block w-100">
        </div>
        `
    }
    document.getElementById("img").innerHTML = mostrarImagenes;
}

// agrega los comentarios que nos brindan en el json.
function mostrarComentarios() {
    let agregarHTML = "";

    agregarHTML += `
            <h3 class="mb-3 mt-4">Comentarios</h3>
            `
    //recorre el listado de los comentarios y los imprime en html
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
    nuevoComentario()
})

function nuevoComentario() {
    //obtengo el valor en el input de puntuacion y el del comentario (lo que el usuario escribe)
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
    //agrego al html con lo valores obtenidos anteriormente 
    document.getElementById("agregarNuevoComentario").innerHTML += agregarComentario;
}

//edito funcion mostrar estrellas
function mostrarEstrellas(puntuacion) {
    let estrellasCompletas = '<span class="fa fa-star checked"></span>';
    let estrellasVacias = '<span class="fa fa-star"></span>';
    let sumaEstrellas = estrellasCompletas.repeat(puntuacion) + estrellasVacias.repeat(5 - puntuacion);

    return (sumaEstrellas);
}

//agrego productos relacionados
function productosRelacionados() {
    let agregarProdRel = "";
    // reccorro el los productos relativos, me guardo el id del prod para luego poder redirrecionarlo a la info de ese prod
    for (let prod of listado.relatedProducts) {
        agregarProdRel += `
            <div onclick="setProdID(${prod.id})" class="card col-sm-1 cursor-active" style="width: 18rem;">
                <img src="${prod.image}" class="card-img-top" alt="img">
                <div class="card-body">
                    <p class="card-text">${prod.name}</p>
                </div>
            </div>
        `
    }
    document.getElementById("ProdRel").innerHTML = agregarProdRel;
}

let btnCart = document.getElementById("botonCarrito");

btnCart.addEventListener("click", previsualizarCompra)

function previsualizarCompra() {
    let nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));

    let agregarHtml = "";

    if (nuevoProd !== null) {

        for (let i = 0; i < nuevoProd.length; i++) {

            agregarHtml += `
            <ul class="list-group"> 
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
            </ul>
        `
        }
        document.getElementById("prevVis").innerHTML = agregarHtml;
    }
}
