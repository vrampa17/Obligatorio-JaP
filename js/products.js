const ORDER_ASC_BY_PRICE = "Price";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let listado = []


// function sortCategories(criteria, array) {
//     let result = [];
//     if (criteria === ORDER_ASC_BY_PRICE) {
//         result = array.sort(function (a, b) {
//             let aCount = parseInt(a.cost);
//             let bCount = parseInt(b.cost);

//             if (aCount > bCount) { return -1; }
//             if (aCount < bCount) { return 1; }
//             return 0;
//         });
//     } else if (criteria === ORDER_DESC_BY_PRICE) {
//         result = array.sort(function (a, b) {
//             let aCount = parseInt(a.cost);
//             let bCount = parseInt(b.cost);

//             if (aCount > bCount) { return -1; }
//             if (aCount < bCount) { return 1; }
//             return 0;
//         });
//     } else if (criteria === ORDER_BY_PROD_COUNT) {
//         result = array.sort(function (a, b) {
//             let aCount = parseInt(a.productCount);
//             let bCount = parseInt(b.productCount);

//             if (aCount > bCount) { return -1; }
//             if (aCount < bCount) { return 1; }
//             return 0;
//         });
//     }

//     return result;
// }
// function sortAndShowCategories(sortCriteria, productsArray) {
//     currentSortCriteria = sortCriteria;

//     if (productsArray != undefined) {
//         listado = productsArray;
//     }

//     listado = sortCategories(currentSortCriteria, listado);

//     //Muestro las categorías ordenadas
//     mostrarProducto();
// }
// document.getElementById("sortPriceAsc").addEventListener("click", function () {
//     sortAndShowCategories(ORDER_ASC_BY_PRICE);

// });

// document.getElementById("sortPriceDesc").addEventListener("click", function () {
//     sortAndShowCategories(ORDER_DESC_BY_PRICE);
// });

// document.getElementById("sortByPrice").addEventListener("click", function () {
//     sortAndShowCategories(ORDER_BY_PROD_COUNT);
// });


function mostrarProducto() {

    let htmlContentToAppend = "";

    let titiulo = "";
    titiulo = `
                        
            <h1>Productos</h1>
            <p class=" lead">Verás aqui todos los productos de la categoria ${listado.catName}</p>
            `

    document.getElementById("titulo").innerHTML = titiulo;


    for (let producto of listado.products) {

        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {
            htmlContentToAppend += `
        
                <div onclick="setCatID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
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
    document.getElementById("producto").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {

    let catID = localStorage.getItem("catID")
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data
            mostrarProducto()
        }
    })
})

//funciona, limpiar
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    mostrarProducto()
});

document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

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



