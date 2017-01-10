/**
 * Created by sp29580 on 8/1/17.
 */
jQuery('a[href^="#"]').click(function (e) {

  jQuery('html,body').animate({scrollTop: jQuery(this.hash).offset().top}, 1000);

  return false;

  e.preventDefault();

});

