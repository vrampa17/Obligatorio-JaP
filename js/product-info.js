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
            productosRelacionados()
        }
    })
})

document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el prodID de la pagina
    let prodID = localStorage.getItem("prodID");
    // obtenemos el json sobre los comentarios de cada producto
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
})

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



