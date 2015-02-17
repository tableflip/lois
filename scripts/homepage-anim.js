$(document).ready(function() {
    var controller = new ScrollMagic(),
        controller2 = new ScrollMagic(),
        // topSectionPin,
        vw = $(window).width() / 100,
        vh = $(window).height() / 100,
        vmax = Math.max(vw, vh),
        topSectionFactor = (vh > vw && vw <= 3.2) ? 35 : 30,
        tl = new TimelineLite({
            paused: true,
            onComplete: function() {
                $('body').removeClass('prevent-scroll');
                new ScrollScene({duration: 2200})
                    .setPin('.splash-scene')
                    .addTo(controller2);
                new ScrollScene({offset: 2200, duration: 0})
                    .setPin('.top-section', {pushFollowers: false, spacerClass: 'topSectionSpacer'})
                    .addTo(controller2);
                // ScrollMagic will not calculate the topbar spacer correctly as it is a different height on
                // initialisation from when we need it to be fixed and the rest of the page scroll.
                // So we need to update the minimum height of the spacer based on the CSS:
                // spacerHeight = topBarHeight + whiteSpaceHeight = 5.3vmax + (1.075 * 5.3vmax) = 2.075 * 5.3 * vmax
                $('.topSectionSpacer').css('min-height', 2.075 * 5.3 * vmax);
            }
        });

    tl.add( TweenLite.to('.top-spacer', 2, {height: topSectionFactor * vmax}), "+=1" );
    tl.add( TweenLite.to('.lois-blurb', 1, {opacity: 1}) );
    tl.add( TweenMax.to('.down-arrow .icon-arrow-down', 0.5, {opacity: 1, repeat: 3, yoyo: true}), '-=0.5' );

    new ScrollScene({offset: 0, duration: 400})
        .setTween(TweenLite.to('.lois-blurb', 1, {opacity: 0}) )
        .addTo(controller);
    new ScrollScene({offset: 200, duration: 800})
        .setTween(TweenLite.to('.top-spacer', 2, {height: 5.6975 * vmax}) )
        .addTo(controller);
    new ScrollScene({offset: 200, duration: 800})
        .setTween(TweenLite.to('.top-menu .centered-button', 2, {height: 10.5 * vmax, width: 10.5 * vmax}) )
        .addTo(controller);
    new ScrollScene({offset: 200, duration: 800})
        .setTween(TweenLite.to('.top-menu .centered-button .button-text', 2, {'font-size': 2.3 * vmax}) )
        .addTo(controller);

    new ScrollScene({offset: 200, duration: 800})
        .setTween(TweenLite.to('.top-menu', 1, {height: 5.3 * vmax}))
        .addTo(controller);
    new ScrollScene({offset: 200, duration: 800})
        .setTween(TweenLite.to('.top-menu .centered-button', 1, {top: 2.65 * vmax}))
        .addTo(controller);

    new ScrollScene({offset: 1000, duration: 600})
        .setTween(TweenLite.to('.top-menu .menu-items .item', 1, {x: 0}))
        .addTo(controller);
    new ScrollScene({offset: 1200, duration: 400})
        .setTween(TweenLite.to('.top-menu .menu-items', 1, {opacity: 1}))
        .addTo(controller);
    new ScrollScene({offset: 1200, duration: 400})
        .setTween(TweenLite.to('.lois-blurb', 1, {height: 0}))
        .addTo(controller).on('');
  
    setTimeout(function() {
        controller.scrollTo(0);
        $('body').addClass('prevent-scroll');
        tl.play();
    }, 200);
});