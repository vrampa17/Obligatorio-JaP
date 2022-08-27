let listado = []

function mostrarAutos() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `
                        
                <div class="container text-center p-4"">
                    <h1>Productos</h1>
                    <p class=" lead">Verás aqui todos los productos de la categoria ${listado.catName}</p>
                </div >
                `

    for (let autos of listado.products) {

        htmlContentToAppend += `
        
                <div onclick="setCatID(${autos.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${autos.image}" alt="${autos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${autos.name} - ${autos.currency} ${autos.cost}</h4>
                            <small class="text-muted">${autos.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${autos.description}</p>
                    </div>
                </div>
                </div>
                `
    }
    document.getElementById("autos").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {

    let catID = localStorage.getItem("catID")
    getJSONData(PODUCTS_AUTOS_URL + catID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data
            mostrarAutos()
        }
    })
})





