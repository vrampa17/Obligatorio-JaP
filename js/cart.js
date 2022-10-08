let listado = []
let productCost = 0;
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            agregarProdCarrito()
        }
    })
})

function agregarProdCarrito() {



    let { articles: [articles] } = listado,

        { name: name, unitCost: costo, currency: currency, image: img, count: cantidad } = articles;


    imgProd.src = img;
    document.getElementById("name").innerHTML = name;
    document.getElementById("precio").innerHTML = ` ${currency} ${costo}`;
    document.getElementById("costoFinal").innerHTML = parseInt(cantidad) * parseInt(costo);
    cantProd.value = cantidad;



    productoAgregado(1)
}

function productoAgregado(cant) {

    name_json = JSON.parse(localStorage.getItem("name"));
    cost_json = JSON.parse(localStorage.getItem("cost"));
    currency_json = JSON.parse(localStorage.getItem("currency"));
    img_json = JSON.parse(localStorage.getItem("img"));


    newImgProd.src = img_json;
    document.getElementById("newName").innerHTML = name_json;
    document.getElementById("newPrecio").innerHTML = ` ${currency_json} ${cost_json}`;
    document.getElementById("newCostoFinal").innerHTML = parseInt(cant) * parseInt(cost_json);
    newCantProd.value = cant;
    // let prodComprados = "";

    // prodComprados += `
    //     <th scope="row"><img src="${img_json}" alt="imgProd" class="img-thumbnail"></th>
    //     <td>${name_json}</td>
    //     <td>${currency_json} ${cost_json}</td>
    //     <td class="col-3"><input type="number" name="productCountInput" class="form-control cantPrd" value="1"
    //             min="0"></td>
    //     <td id="costoFinal" class="col">${cantProd.value * parseInt(cost_json)}</td>
    // `
    // document.getElementById("nuevosProd").innerHTML = prodComprados;
}

document.addEventListener("DOMContentLoaded", function () {


    document.getElementById("cantProd").addEventListener("change", function () {

        let { articles: [articles] } = listado,

            { name: name, unitCost: costo, currency: currency, image: img } = articles;

        var cantidad = document.getElementById("cantProd").value;
        var costoTotal = parseInt(cantidad) * parseInt(costo);


        imgProd.src = img;
        document.getElementById("name").innerHTML = name;
        document.getElementById("precio").innerHTML = ` ${currency} ${costo}`;
        document.getElementById("costoFinal").innerHTML = costoTotal;
        document.getElementById("name").innerHTML = name;
        cantProd.value = cantidad;


    });

    document.getElementById("newCantProd").addEventListener("change", function () {

        var cantidad = document.getElementById("newCantProd").value;
        productoAgregado(cantidad)
    });

})

