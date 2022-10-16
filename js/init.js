const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}


let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


//guardo id del producto 
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}


//mostrar email en la barra de navegación cuando cargue la pagina con el logalStorage.getItem recupera el dato de email y lo muestra
document.addEventListener("DOMContentLoaded", function () {
  //obtenemos el valor y lo pasamos a objeto
  email_json = JSON.parse(localStorage.getItem("email"));

  document.getElementById("email").innerHTML = email_json;

})

document.getElementById("cerrar_sesion").addEventListener("click", function () {
  //elimina el usuario que se habia registrado 
  localStorage.removeItem("email");
  localStorage.removeItem("nuevoProd");

});

// Scroll Up
document.getElementById("boton-up").addEventListener("click", scrollUp);

function scrollUp() {
  var desplScroll = document.documentElement.scrollTop;
  if (desplScroll > 0) {
    window.scrollTo(0, 0)
  }
}

botonUp = document.getElementById("boton-up");

window.onscroll = function () {
  var scroll = document.documentElement.scrollTop;
  if (scroll > 100) {
    botonUp.style.transform = "scale(1)";
  } else if (scroll < 100) {
    botonUp.style.transform = "scale(0)";
  }
}




