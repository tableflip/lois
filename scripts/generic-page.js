$(document).ready(function() {

    var controller = new ScrollMagic();

    new ScrollScene()
      .setPin('.top-section')
      .addTo(controller);
});
