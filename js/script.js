/**
 * Created by sp29580 on 8/1/17.
 */

//FUNCIONES DESPLAZAMIENTO Y FORMATO
$(window).on("load", function() {
  $('#coverimage').find('img').each(function() {
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
  var patronUsar = $regex ;
  var resultado = patronUsar.test($textoValidar);
  return resultado;
};

function contarPalabras(){
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
  if (nombre == "" || apellido == "" ||  email == "" || phone == "") {
    alert("Todos los campos son obligatorios.....!");
    return false;
  }else{

    var estadoEmail = validarCadena(email, regexEmail);
    var estadoPhone = validarCadena(phone, regexPhone1 ) ||
                      validarCadena(phone, regexPhone2  ) ? true : false ;

    var estadoConocimiento =  document.getElementById("rd1").checked ||
                              document.getElementById("rd2").checked ||
                             (document.getElementById("rd3").checked && contarPalabras() < 150 ) ? true : false ;

    if( estadoEmail && estadoPhone && estadoConocimiento){
      return true;
    }else{
      var mensaje = "Errores al validar:\n"
      if (!estadoEmail){
        mensaje = mensaje + "El formato del email no es correcto!\n";
      }
      if (!estadoPhone){
        mensaje = mensaje + "El formato del teléfono no es correcto!\n";
      }
      if (!estadoConocimiento && document.getElementById("rd3").checked ){
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

var plantillaElementos = $('#plantillaTarea .tarea');
var listaTareas         = $('#listaTareas');

var insertarElementoLista = function(datosElemento) {
  var elemento = plantillaElementos.clone()
  elemento.attr('data-id',datosElemento.id)
  elemento.find('.description').text(datosElemento.description)
  if(datosElemento.completed) {
    elemento.addClass('completed')
  }
  listaTareas.append(elemento)
}