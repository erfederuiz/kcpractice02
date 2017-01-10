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

