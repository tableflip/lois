$(document).ready(function() {

    var controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene()
      .setPin('.top-section')
      .addTo(controller);
});
