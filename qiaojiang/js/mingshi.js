$(function() {
    if ($('#ms-sld').length) {
        $('#ms-sld').slides({
            generatePagination: true,
            generateNextPrev: true,
            play: 3000,
            pause: 2500,
            hoverPause: true
        });
	}

	if ($('#ms-sld2').length) {
	    $('#ms-sld2').slides({
	        generatePagination: true,
	        generateNextPrev: true,
	        play: 3000,
	        pause: 2500,
	        hoverPause: true
	    });
	}
});