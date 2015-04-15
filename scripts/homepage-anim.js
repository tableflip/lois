$(document).ready(function() {

    var LOIS_BUTTON_SIZE = 6.7,
        LOIS_BUTTON_BORDER = 0.3,
        TOP_MENU_HEIGHT = 4.6;

    var controller = new ScrollMagic(),
        // topSectionPin,
        vw = $(window).width() / 100,
        vh = $(window).height() / 100,
        vmax = Math.min(Math.max(vw, vh), 12.8),
        topSectionFactor = (vh > vw && vw <= 4) ? 30.5 : 21.5,
        tl;

    var videos = document.getElementsByTagName('iframe'),
        video,
        i,
        playerOrigin = '*',
        onMessageReceived;

    // Need to manually reset image container sizes to match images
    var maxImageHeight = vh * 125;
    $('img').bind('load', function() {
      var $el = $(this); $el.parents('.splash-image').css('height', Math.min($el.height() * 100 * vw / $el.width(), maxImageHeight) + 'px');
    });

    if (vw >= 6.4) {

      tl = new TimelineLite({
          paused: true,
          onComplete: function() {
              // $('body').removeClass('prevent-scroll');
              new ScrollScene({duration: 1500})
                  .setPin('.splash-scene')
                  .addTo(controller);
              new ScrollScene({offset: 1500, duration: 0})
                  .setPin('.top-section', {pushFollowers: false, spacerClass: 'topSectionSpacer'})
                  .addTo(controller);
              // ScrollMagic will not calculate the topbar spacer correctly as it is a different height on
              // initialisation from when we need it to be fixed and the rest of the page scroll.
              // So we need to update the minimum height of the spacer based on the CSS:
              $('.topSectionSpacer').css('min-height', TOP_MENU_HEIGHT * vmax);
          }
      });

      $('.top-spacer').css('height', (topSectionFactor * vmax) + 'px');
      // tl.add( TweenLite.to('.top-spacer', 2, {height: topSectionFactor * vmax}), "+=1" );
      $('.lois-blurb').css('opacity', 1);
      // tl.add( TweenLite.to('.lois-blurb', 1, {opacity: 1}) );
      tl.add( TweenMax.to('.down-arrow i', 0.5, {opacity: 1, repeat: 2, yoyo: true}), '-=0.5' );

      new ScrollScene({offset: 0, duration: 400})
          .setTween(TweenLite.to('.lois-blurb', 1, {opacity: 0}) )
          .addTo(controller);
      new ScrollScene({offset: 200, duration: 800})
          .setTween(TweenLite.to('.top-spacer', 2, {height: 0}) )
          .addTo(controller);
      new ScrollScene({offset: 200, duration: 800})
          .setTween(TweenLite.to('.top-menu .centered-button', 2, {height: LOIS_BUTTON_SIZE * vmax, width: LOIS_BUTTON_SIZE * vmax}) )
          .addTo(controller);
      new ScrollScene({offset: 200, duration: 800})
          .setTween(TweenLite.to('.top-menu .centered-button .button-text', 2, {'font-size': LOIS_BUTTON_SIZE * 0.26 * vmax}) )
          .addTo(controller);
      new ScrollScene({offset: 200, duration: 800})
          .setTween(TweenLite.to('.top-menu.collapsible .centered-button', 2, {'margin-top': 0}) )
          .addTo(controller);

      $('.top-menu').css('height', TOP_MENU_HEIGHT * vmax);
      // new ScrollScene({offset: 200, duration: 800})
      //     .setTween(TweenLite.to('.top-menu', 1, {height: TOP_MENU_HEIGHT * vmax}))
      //     .addTo(controller);
      new ScrollScene({offset: 200, duration: 800})
          .setTween(TweenLite.to('.top-menu .centered-button', 1, {top: ((LOIS_BUTTON_SIZE * 0.5) + LOIS_BUTTON_BORDER) * vmax}))
          .addTo(controller);

      $('.top-menu .menu-items .item').css('transform', 'translateX(0)');
      $('.top-menu .menu-items').css('opacity', 1);
      // new ScrollScene({offset: 1000, duration: 600})
      //     .setTween(TweenLite.to('.top-menu .menu-items .item', 1, {x: 0}))
      //     .addTo(controller);
      // new ScrollScene({offset: 1200, duration: 400})
      //     .setTween(TweenLite.to('.top-menu .menu-items', 1, {opacity: 1}))
      //     .addTo(controller);
      new ScrollScene({offset: 1200, duration: 400})
          .setTween(TweenLite.to('.lois-blurb', 1, {height: 0}))
          .addTo(controller).on('');
      new ScrollScene({triggerElement: '.splash-legal', triggerHook: 0.5})
          .setTween(TweenLite.to('.down-arrow i', 0.5, {opacity: 0}))
          .addTo(controller);
      new ScrollScene({triggerElement: '.splash-legal', triggerHook: 0.7})
          .setClassToggle('.down-arrow i', 'hidden')
          .addTo(controller);

      $(document).ready(function() {
        controller.scrollTo(0);
        // $('body').addClass('prevent-scroll');
        $('.splash-scene').removeClass('invisible');
        setTimeout(function() {
          tl.play();
        }, 500);
      });

      // Placeholder for if/when video is enabled

      // Handle messages received from the player
      onMessageReceived = function(e) {
        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) return false;

        if (playerOrigin === '*') playerOrigin = event.origin;

        var data = JSON.parse(e.data);

        if (data.event === 'ready') console.log(event.origin);
      };
      // for (i = 0; i < videos.length; i++) {
      //   video = videos[i];
      //   video.contentWindow.postMessage({method: 'setVolume', value: 0}, '*');
      //   video.contentWindow.postMessage({method: 'setLoop', value: true}, '*');
      //   video.contentWindow.postMessage({method: 'play', value: null}, '*');
      // }

    }

    else {

      tl = new TimelineLite({
          paused: true,
          onComplete: function() {
              $('body').removeClass('prevent-scroll');
              new ScrollScene({duration: 0})
                  .setPin('.top-section', {pushFollowers: false, spacerClass: 'topSectionSpacer'})
                  .addTo(controller);
              // ScrollMagic will not calculate the topbar spacer correctly as it is a different height on
              // initialisation from when we need it to be fixed and the rest of the page scroll.
              // So we need to update the minimum height of the spacer based on the CSS:
              $('.topSectionSpacer').css('min-height', TOP_MENU_HEIGHT * vmax);
          }
      });

      tl.add( TweenLite.to('.top-spacer', 2, {height: topSectionFactor * vmax}), "+=1" );
      tl.add( TweenLite.to('.lois-blurb', 1, {opacity: 1}) );
      tl.add( TweenLite.to('.lois-blurb', 1, {opacity: 0}), "+=3" );
      tl.add( TweenLite.to('.top-spacer', 2, {height: 0}), "-=0.5" );
      tl.add( TweenLite.to('.top-menu .centered-button', 2, {height: LOIS_BUTTON_SIZE * vmax, width: LOIS_BUTTON_SIZE * vmax}), "-=2" );
      tl.add( TweenLite.to('.top-menu .centered-button .button-text', 2, {'font-size': LOIS_BUTTON_SIZE * 0.26 * vmax}), "-=2" );
      tl.add( TweenLite.to('.top-menu', 1, {height: TOP_MENU_HEIGHT * vmax}), "-=2");
      tl.add( TweenLite.to('.top-menu .centered-button', 1, {top: ((LOIS_BUTTON_SIZE * 0.5) + LOIS_BUTTON_BORDER) * vmax}), "-=2");
      tl.add( TweenLite.to('.top-menu .menu-items .item', 1, {x: 0}));
      tl.add( TweenLite.to('.top-menu .menu-items', 1, {opacity: 1}), "-=0.5");
      tl.add( TweenLite.to('.lois-blurb', 1, {height: 0}), "-=1");

      $(document).ready(function() {
        controller.scrollTo(0);
        // $('body').addClass('prevent-scroll');
        $('.splash-scene').removeClass('invisible');
        setTimeout(function() {
          tl.play();
        }, 500);
      });

      // Placeholder for if/when video is enabled (no autoplay for mobile)

      for (i = 0; i < videos.length; i++) {
        video = videos[i];
        // video.contentWindow.postMessage({method: 'setVolume', value: 0}, '*');
        video.contentWindow.postMessage({method: 'play', value: null}, '*');
      }

    }

    // Listen for messages from the video player
    if (window.addEventListener){
        window.addEventListener('message', onMessageReceived, false);
    }
    else {
        window.attachEvent('onmessage', onMessageReceived, false);
    }

});
