$(document).ready(function() {

	var vw = $(window).width() / 100,
		vh = $(window).height() / 100,
		vmax = Math.max(vw, vh),
		topSectionFactor = (vh > vw && vw <= 4) ? 30.5 : 21.5;
        tl = new TimelineLite({paused: true});

		$('html').css('font-size', vmax + 'px');
    $('body').addClass('no-scroll');

    tl.add( TweenLite.to('.top-spacer', 2, {height: topSectionFactor * vmax}) );
    tl.add( TweenLite.to('.splash-image.mini-page', 1, {height: (100 * vh) - (topSectionFactor * vmax)}), '-=1' );
    tl.add( TweenLite.to('.lois-blurb', 1, {opacity: 1}) );

    $(document).ready(function() {
			$('.splash-scene').removeClass('invisible');
			setTimeout(function() {
	    	tl.play();
	    }, 500);
		});

});
