jQuery(document).ready(function($) {

var um = $('.unique-provada-url').text();
$('.unique-field-form').find('input').attr('value', um);

    $('#ct-mbs-dl').on("click", function (e) {
        var um = $('.unique-provada-url').text();
        $('.ct-moodboard').printThis({
          importCSS: true,
          importStyle: true,
          loadCSS: "/wp-content/themes/stoni-child/css/print21.css",
            header: "<div class='moodboard-header'><img src='https://cdn.shopify.com/s/files/1/0422/9274/0261/files/logo-pravada.png?v=1597867706'><h1>Your unique Pravada Moodboard</h1></div>",
        });

        e.preventDefault();
    });

    $('.hide-modal').click(function() {
		$('.pum').trigger('click');
	});

});

jQuery(document).ready(function($) {
    $('.ctw-moodboard').click(function(e) {

        var innerprodID = $(this).attr('rel');

        $('#footer-mb-hidden input[type="hidden"]').each(function() {
            var inputVal = $(this).attr('value');
            if (inputVal == "") {
                var emptyField = $(this);
                emptyField.attr('value', innerprodID)
                return false;
            }
        });

        $('#footer-mb-hidden').submit();

        e.preventDefault();
    });
});


jQuery(document).ready(function($) {
    $('.ctw-magnify').click(function() {
        var prod_url = $(this).parent().find('.prod-imgpop').attr('src');
        $('.wishpopup').replaceWith('<div class="wishpopup"><img src="'+prod_url+'"></div>')
    });
});


jQuery(document).ready(function($) {
    $('.c-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
});


jQuery(document).ready(function($) {
	$('#ct-mbs-start-over').click(function(e) {
		$('.ct-mb-close').click();
		$('.ct-mb-load').hide();
		$('.ct-mb-active .ct-mb-load').show();
		e.preventDefault();
	});

	$('.startoverbtn').click(function(e) {
		$('.ct-mb-close').click();
		$('.ct-mb-load').hide();
		$('.ct-mb-active .ct-mb-load').show();
		e.preventDefault();
	});
});