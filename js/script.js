/**
 * Created by sp29580 on 8/1/17.
 */


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

function validarEmail($emailContent) {
  var emailReg = /^([\w.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test($emailContent);
}

function validacionFormulario(){
// Storing Field Values In Variables
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var contact = document.getElementById("contact").value;
// Regular Expression For Email
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
// Conditions
  if (name != '' && email != '' && contact != '') {
    if (email.match(emailReg)) {
      if (document.getElementById("male").checked || document.getElementById("female").checked) {
        if (contact.length == 10) {
          alert("All type of validation has done on OnSubmit event.");
          return true;
        } else {
          alert("The Contact No. must be at least 10 digit long!");
          return false;
        }
      } else {
        alert("You must select gender.....!");
        return false;
      }
    } else {
      alert("Invalid Email Address...!!!");
      return false;
    }
  } else {
    alert("All fields are required.....!");
    return false;
  }
}