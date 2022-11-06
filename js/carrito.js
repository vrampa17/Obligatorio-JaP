//
let prodID = localStorage.getItem("prodID");

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            productoUn = resultObj.data
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));
        }
    })
})
//

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

let carrito = [];
let nuevoProd = [];

document.getElementById("btnComprar").addEventListener("click", function () {
    agregarAlCarrito(productoUn)
    showAlertSuccess();
})

function agregarAlCarrito(prod) {

    nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));
    console.log('prod.unitCost', prod)
    const cant = {
        count: 1,
        currency: prod.currency,
        id: prod.id,
        image: prod.images[0],
        name: prod.name,
        unitCost: prod.cost,

    };
    const finalResult = Object.assign(cant);

    if (nuevoProd === null) {
        carrito.push(finalResult);
        let carrito_json = JSON.stringify(carrito);
        localStorage.setItem("nuevoProd", carrito_json);

    } else if (buscoCantProds(nuevoProd, productoUn.id)) {

        const isLargeNumber = (element) => element.id === productoUn.id;
        let lugar = nuevoProd.findIndex(isLargeNumber)
        nuevoProd[lugar].count = nuevoProd[lugar].count + 1;
        carrito_json = JSON.stringify(nuevoProd);
        localStorage.setItem("nuevoProd", carrito_json);


    } else {
        nuevoProd.push(finalResult);
        carrito_json = JSON.stringify(nuevoProd);
        localStorage.setItem("nuevoProd", carrito_json);
    }

}

function buscoCantProds(array, pruebaID) {

    for (var i = 0; i < array.length; i++) {
        if (pruebaID === array[i].id) {
            return true
        }
    }
}

