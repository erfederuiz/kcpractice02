/**
 * Created by sp29580 on 8/1/17.
 */

//FUNCIONES DESPLAZAMIENTO Y FORMATO
$(window).on("load", function () {
  $('#coverimage').find('img').each(function () {
    var imgClass = (this.width / this.height > 1) ? 'wide' : 'tall';
    $(this).addClass(imgClass);
  })
});


jQuery('a[href^="#"]').click(function (e) {
  jQuery('html,body').animate({scrollTop: jQuery(this.hash).offset().top}, 1000);
  return false;
  e.preventDefault();
});

// FUNCIONES VALIDACION FORMULARIO
function validarCadena($textoValidar, $regex) {
  var patronUsar = $regex;
  var resultado = patronUsar.test($textoValidar);
  return resultado;
};

function contarPalabras() {
  //document.getElementById("textoEscondido").value
  // var palabras = $('#').val().split(/\b[\s,\.\-:;]*/).lenght;
  var texto = document.getElementById("textoEscondido").value;
  var palabras = texto.split(/\b[\s,\.\-:;]*/).length;
  return palabras;
};

function validacionFormulario() {
  var nombre = document.getElementById("nombreForm").value;
  var apellido = document.getElementById("apellidoForm").value;
  var email = document.getElementById("emailForm").value;
  var phone = document.getElementById("phoneForm").value;

  var regexEmail = /^[\w.-_]+@{1}[\w]+\.[a-z]{2,3}$/;
  var regexPhone1 = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
  var regexPhone2 = /^(6|7|8|9)[0-9]{8}$/;

// Comprobaciones
  if (nombre == "" || apellido == "" || email == "" || phone == "") {
    alert("Todos los campos son obligatorios.....!");
    return false;
  } else {

    var estadoEmail = validarCadena(email, regexEmail);
    var estadoPhone = validarCadena(phone, regexPhone1) ||
    validarCadena(phone, regexPhone2) ? true : false;

    var estadoConocimiento = document.getElementById("rd1").checked ||
    document.getElementById("rd2").checked ||
    (document.getElementById("rd3").checked && contarPalabras() < 150 ) ? true : false;

    if (estadoEmail && estadoPhone && estadoConocimiento) {
      crearListaEnServer(nombre, apellido);
      return true;
    } else {
      var mensaje = "Errores al validar:\n"
      if (!estadoEmail) {
        mensaje = mensaje + "El formato del email no es correcto!\n";
      }
      if (!estadoPhone) {
        mensaje = mensaje + "El formato del teléfono no es correcto!\n";
      }
      if (!estadoConocimiento && document.getElementById("rd3").checked) {
        mensaje = mensaje + "Escribe menos de 150 palabros!";
      }
      alert(mensaje);
      return false;
    }

  }
}


//FUNCIONES AJAX TO-DO LIST


/*
 var itemTemplate = $('#templates .item')
 var list         = $('#list')

 var addItemToPage = function(itemData) {
 var item = itemTemplate.clone()
 item.attr('data-id',itemData.id)
 item.find('.description').text(itemData.description)
 if(itemData.completed) {
 item.addClass('completed')
 }
 list.append(item)
 }
 */
var insercionElementoAjax = function (){
  var descripcionSugerencia = document.getElementById("descripcionElementoAjax").value;
  if (descripcionSugerencia == ""){
    alert("La descripción es obligatoria.....!");
    return false;
  }else{
    var nombre = document.getElementById("nombreListaAjax").value;
    var apellido = document.getElementById("apellidoListaAjax").value;
    if (nombre == "" || apellido == "") {
      alert("Nombre y apellidos son obligatorios.....!");
      return false;
    }else{
      var idListaEnServidor = nombre + "_" + apellido;
      var urlContent = { };
      var dataContent = { };
      urlContent = "https://listalous.herokuapp.com/lists/" + idListaEnServidor +"/items";
      dataContent['description'] = descripcionSugerencia;
      dataContent['completed'] = 'false' ;

      var creationRequest = $.ajax({
        type: 'POST',
        url: urlContent ,
        data: dataContent
      })

      creationRequest.done(function(itemDataFromServer) {
        insertarElementoLista(itemDataFromServer)
      })

    }
  }
}

var validacionListaAjax = function () {
  var nombre = document.getElementById("nombreListaAjax").value;
  var apellido = document.getElementById("apellidoListaAjax").value;
// Comprobaciones
  if (nombre == "" || apellido == "") {
    alert("Nombre y apellidos son obligatorios.....!");
    return false;
  } else {
    var idListaEnServidor = nombre + "_" + apellido;

    var list = document.getElementById("listaTareas");
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    recuperarListaAjax(idListaEnServidor);
    return true;
  }
}

// Crear una lista en el servidor AJAX listalous.herokuapp.com/lists
var crearListaEnServer = function ($nombre, $apellido) {
  var idListaEnServidor = $nombre + "_" + $apellido;
  var dataContent = { };
  dataContent['data'] = idListaEnServidor;
  $.ajax({
      type: 'POST',
      url: 'https://listalous.herokuapp.com/lists',
      data: dataContent
    }

  )
};

var recuperarListaAjax = function ($idListaEnServidor){

  var urlContent = { };
  urlContent = "https://listalous.herokuapp.com/lists/" + $idListaEnServidor +"/";
  var loadRequest = $.ajax({
    type: 'GET',
    url: urlContent
  })


 loadRequest.done(function(dataFromServer) {
   var itemsData = dataFromServer.items

   itemsData.forEach(function(itemData) {
   insertarElementoLista(itemData)
 })
 })




};




// Insertar un elemento de la lista como div en la página
var insertarElementoLista = function (datosElemento) {
  var plantillaElementos = $('#plantillaTarea .tarea');
  var htmlListaTareas = $('#listaTareas');

  var elemento = plantillaElementos.clone()
  elemento.attr('task-id', datosElemento.id)
  elemento.find('.taskDescription').text(datosElemento.description)
  if (datosElemento.completed) {
    elemento.addClass('completed')
  }
  htmlListaTareas.append(elemento)
}



