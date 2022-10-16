//
let prodID = localStorage.getItem("prodID");

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            productoUn = resultObj.data
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

    const cant = {
        cantProdCarrito: 1
    };
    const finalResult = Object.assign(prod, cant);

    if (nuevoProd === null) {
        carrito.push(finalResult);
        let carrito_json = JSON.stringify(carrito);
        localStorage.setItem("nuevoProd", carrito_json);

    } else if (buscoCantProds(nuevoProd, productoUn.id)) {

        const isLargeNumber = (element) => element.id === productoUn.id;
        let lugar = nuevoProd.findIndex(isLargeNumber)
        console.log('lugar', lugar)
        nuevoProd[lugar].cantProdCarrito = nuevoProd[lugar].cantProdCarrito + 1;
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

