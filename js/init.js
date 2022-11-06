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

  document.getElementById("email").innerHTML = `<svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" class="bi bi-person-circle" viewBox = "0 0 16 16" >
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg> ` + email_json;

})


document.getElementById("cerrar_sesion").addEventListener("click", function () {
  //elimina el usuario que se habia registrado 
  localStorage.removeItem("email");
  localStorage.removeItem("nuevoProd");

});

document.getElementById("miPerfil").addEventListener('click', redireccionar)
// evalua si esta logueado y lo redirecciona segun corresponda, al login si no esta logueado y al perfil si si lo esta
function redireccionar() {
  email_json = JSON.parse(localStorage.getItem("email"));
  if (email_json === null) {
    window.location = "index.html"
  } else {
    window.location = "my-profile.html"
  }
}
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




