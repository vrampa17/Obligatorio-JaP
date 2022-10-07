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
    document.getElementById("name").innerHTML = name;
    cantProd.value = cantidad;

    name_json = localStorage.getItem("name");
    cost_json = localStorage.getItem("cost");
    currency_json = localStorage.getItem("currency");
    img_json = localStorage.getItem("img");

    // prodComprados += `
    // <tr>
    //     <th scope="row"><img src="${img}" alt="imgProd" class="img-thumbnail"></th>
    //     <td>${name_json}</td>
    //     <td>${currency_json} ${cost_json}</td>
    // </tr>
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

})