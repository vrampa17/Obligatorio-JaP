let minCount = undefined;
let maxCount = undefined;
let listado = []
let search = "";

document.addEventListener("DOMContentLoaded", function (e) {
    //obtiene el catID de la pagina
    let catID = localStorage.getItem("catID");
    //con la url de prducts el cat id y la extensión .json formamos la url deseada para cada producto. 
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data
            mostrarProducto()
        }
    })
})

function mostrarProducto() {

    let htmlContentToAppend = "";

    let titiulo = "";
    titiulo = `  
            <h1>Productos</h1>
            <p>Verás aqui todos los productos de la categoria ${listado.catName}</p>
            `

    document.getElementById("titulo").innerHTML = titiulo;


    for (let producto of listado.products) {
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            if (producto.name.toLowerCase().includes(search.toLowerCase())) {
                htmlContentToAppend += `
        
                <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost}</h4>
                            <small class="text-muted">${producto.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${producto.description}</p>
                    </div>
                </div>
                </div>
                `
            }
        }
    }
    document.getElementById("producto").innerHTML = htmlContentToAppend;
}

//ordena el listado de productos teniendo en cuenta su pecio (listado.products.cost) de forma ascendente
function ordenarPrecioAsd() {
    listado.products.sort(function (a, b) {
        return parseInt(a.cost) - parseInt(b.cost);
    });
    mostrarProducto()
}
//ordena el listado de productos teniendo en cuenta su pecio (listado.products.cost) de forma descendente
function ordenarPrecioDes() {
    listado.products.sort(function (a, b) {
        return parseInt(b.cost) - parseInt(a.cost);
    });
    mostrarProducto()
}

//ordena el listado de productos teniendo en cuenta su relevancia, la vantidad de productos vendidos (listado.products.soldCount) de forma descendente
function ordenarRelevanciaDes() {
    listado.products.sort(function (a, b) {
        return parseInt(b.soldCount) - parseInt(a.soldCount);
    });
    mostrarProducto()
}

//cuando haga click en el boton que tiene id ordAsdPrecio ejecuta la funcion  ordenarPrecioAsd()
document.getElementById("ordAsdPrecio").addEventListener("click", function () {
    ordenarPrecioAsd();
});
//cuando haga click en el boton que tiene id ordDesPrecio ejecuta la funcion ordenarPrecioDes()
document.getElementById("ordDesPrecio").addEventListener("click", function () {
    ordenarPrecioDes();
});
//cuando haga click en el boton que tiene id ordDesRelevancia ejecuta la funcion  ordenarRelevanciaDes()
document.getElementById("ordDesRelevancia").addEventListener("click", function () {
    ordenarRelevanciaDes();
});


//boton limpiar, borrar lo que se habia filtrado. 
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("filtrarPrecioMin").value = "";
    document.getElementById("filtrarPrecioMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    mostrarProducto()
});
//filtrar por precio
document.getElementById("filtroPrecio").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCount = document.getElementById("filtrarPrecioMin").value;
    maxCount = document.getElementById("filtrarPrecioMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }
    mostrarProducto();
});

//Parte del buscador, con el evento input, cuando se va escribiendo va ejecutando
document.getElementById("buscador").addEventListener("input", function () {
    search = document.getElementById("buscador").value;
    mostrarProducto();
})

