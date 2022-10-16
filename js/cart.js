let listado = []

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data;
            agregarProdCarrito()
            let prod_json = JSON.stringify(listado.articles);
            localStorage.setItem("prodUser", prod_json);
        }
    })
})

function agregarProdCarrito() {

    let prod = JSON.parse(localStorage.getItem("prodUser"));
    let agregarHtml = "";
    agregarHtml = `
        <tr>
                <th scope="row" class="col">
                  <img src="${prod[0].image}" alt="imgProd" class="img-thumbnail">
                </th>
                <td class="col-3">${prod[0].name}</td>
                <td id="precio" class="col-3">${prod[0].currency} ${prod[0].unitCost}</td>
                <td class="col-3"><input type="number" name="productCountInput" class="form-control cantPrd" value="${prod[0].count}" min="1" id="cantProd"></td>
                <td class="col"><strong id="costoFinal${prod[0].id}">${prod[0].currency}${parseInt(prod[0].unitCost) * parseInt(prod[0].count)}</strong></td>
                </tr>
        `
    document.getElementById("agregarNewProds").innerHTML = agregarHtml;

    let nuevoProd = JSON.parse(localStorage.getItem("nuevoProd"));
    if (nuevoProd !== null) {
        let validacion = 0;

        for (let i = 0; i < nuevoProd.length; i++) {

            if (validacion != parseInt(nuevoProd[i].id)) {
                agregarHtml += `
            <tr> 
                <th scope="row" class="col">
                  <img src="${nuevoProd[i].images[0]}" alt="imgProd" class="img-thumbnail">
                </th>
                <td class="col-3">${nuevoProd[i].name}</td>
                <td id="precio" class="col-3">${nuevoProd[i].currency} ${nuevoProd[i].cost}</td>
                <td class="col-3"><input type="number" name="${nuevoProd[i].name}" class="form-control cantPrd" value="${nuevoProd[i].cantProdCarrito}" min="1" id="cantProdPrueb"></td>
                <td class="col"><strong id="costoFinal${nuevoProd[i].id}">${nuevoProd[i].currency}${parseInt(nuevoProd[i].cost) * parseInt(nuevoProd[i].cantProdCarrito)}</strong></td>
                </tr>
        `
            }

            validacion = parseInt(nuevoProd[i].id);
        }
        document.getElementById("agregarNewProds").innerHTML = agregarHtml;
    }


    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('change', () => {
            let actualizoDatos = JSON.parse(localStorage.getItem("nuevoProd"));
            const isLargeNumber = (element) => element.name === input.name;
            let lugar = actualizoDatos.findIndex(isLargeNumber)
            cantProdCarrito = input.value
            actualizoDatos[lugar].cantProdCarrito = cantProdCarrito;
            carrito_json = JSON.stringify(actualizoDatos);
            localStorage.setItem("nuevoProd", carrito_json);
            agregarProdCarrito()

        })
    })

    document.getElementById("cantProd").addEventListener("change", function (e) {
        prod[0].count = this.value
        prod_json = JSON.stringify(prod);
        localStorage.setItem("prodUser", prod_json);
        agregarProdCarrito()
    })

}





