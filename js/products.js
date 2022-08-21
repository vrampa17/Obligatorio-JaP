let listado = []


function mostrarAutos(){
    let htmlContentToAppend = "";

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

    getJSONData(PODUCTS_AUTOS_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            listado = resultObj.data
            mostrarAutos()
        }
    })
})




