jQuery(document).ready(function($) {

    var delay = 2000;

    $( "body" ).on( "click", ".addRandom", function() {
        // var ID1 = $(this).closest('.ct-mb-empty').find('input[name="m1"]').attr('value');
        // var ID2 = $(this).closest('.ct-mb-empty').find('input[name="m2"]').attr('value');
        // var ID3 = $(this).closest('.ct-mb-empty').find('input[name="m3"]').attr('value');
        // var ID4 = $(this).closest('.ct-mb-empty').find('input[name="m4"]').attr('value');
        // var ID5 = $(this).closest('.ct-mb-empty').find('input[name="m5"]').attr('value');
        // var ID6 = $(this).closest('.ct-mb-empty').find('input[name="m6"]').attr('value');
        // var ID7 = $(this).closest('.ct-mb-empty').find('input[name="m7"]').attr('value');
        // var ID8 = $(this).closest('.ct-mb-empty').find('input[name="m8"]').attr('value');
        // var ID9 = $(this).closest('.ct-mb-empty').find('input[name="m9"]').attr('value');
        // var ID10 = $(this).closest('.ct-mb-empty').find('input[name="m10"]').attr('value');

        // $('#mood-form input[name="m1"]').attr('value', ID1);
        // $('#mood-form input[name="m2"]').attr('value', ID2);
        // $('#mood-form input[name="m3"]').attr('value', ID3);
        // $('#mood-form input[name="m4"]').attr('value', ID4);
        // $('#mood-form input[name="m5"]').attr('value', ID5);
        // $('#mood-form input[name="m6"]').attr('value', ID6);
        // $('#mood-form input[name="m7"]').attr('value', ID7);
        // $('#mood-form input[name="m8"]').attr('value', ID8);
        // $('#mood-form input[name="m9"]').attr('value', ID9);
        // $('#mood-form input[name="m10"]').attr('value', ID10);


        var currnet_random = $(this).closest('.ct-mb-mod ');
        var msession_name = $(this).prev().attr('name');
        var load_icon = $(this).closest('.ct-mb-mod').find('.ct-mb-load');

        // var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";

        $.ajax(
         {
             type: 'POST',
             url: prefix_vars.ajaxurl,
             data: {
                action: 'return_moodboard',
                msession: msession_name
             },
             beforeSend: function () {
                load_icon.html('<img src="/wp-content/uploads/2020/03/spinner2.gif">');
                $('.ct-mb-close, .ct-mb-empty li').css('pointer-events', 'none');
            },
             success: function( data ) {
                console.log('done adding random');
                update_footer_mb();

                setTimeout(function(){
                    currnet_random.replaceWith(data);
                    load_icon.html("");
                    $('.ct-mb-close, .ct-mb-empty li').css('pointer-events', 'all');
                }, delay);

             },
             error: function()
            {
                 load_icon.html("");
            }
         });

    });


    $( "body" ).on( "click", ".ct-mb-close", function() {

        var currnet_random = $(this).closest('.ct-mb-mod');
        var msession_name = $(this).find('span').attr('class');
        var load_icon = $(this).closest('.ct-mb-mod').find('.ct-mb-load');

        $('#mood-form input').each(function() {
            var y = $(this).attr('name');
            if (msession_name == y ) {
               $(this).val("");
            }
        });

        $.ajax(
         {
             type: 'POST',
             url: prefix_vars.ajaxurl,
             data: {
                action: 'return_emptymoodboard',
                msession: msession_name
             },
             beforeSend: function () {
                load_icon.html('<img src="/wp-content/uploads/2020/03/spinner2.gif">');
                $('.ct-mb-close, .ct-mb-empty li').css('pointer-events', 'none');
            },
             success: function( data ) {
                console.log('done closign');

                update_footer_mb();

                setTimeout(function(){
                    currnet_random.replaceWith(data);
                    load_icon.html("");
                    $('.ct-mb-close, .ct-mb-empty li').css('pointer-events', 'all');
                }, delay);

             },
             error: function()
            {
                 load_icon.html("");
            }
         });

    });


    $( "body" ).on( "click", ".re-shuffle", function() {
        $(this).closest('.ct-mb-mod').find('.addRandom').click();
    });




    $( "body" ).on( "click", ".mb-prodID", function() {
        var emptyField_1;
        var attr_value = $(this).attr('alt');
        var updated_value = '';
        var current_click = $(this);

        $('#footer-mb-hidden input[type="hidden"]').each(function() {
            var inputVal = $(this).attr('value');
            if (inputVal == "") {

                emptyField_1 = $(this).attr('name');
                updated_value = attr_value;
                return false;
            }
        });

        var innerprodID = $(this).attr('alt');

        $.ajax(
         {
             type: 'POST',
             url: prefix_vars.ajaxurl,
             data: {
                action: 'add_popup_moodboard',
                popsessionid: innerprodID,
                modalsession: emptyField_1
             },
             beforeSend: function () {
                $('.mb-prodID').css('pointer-events', 'none');
            },
            success: function( data ) {
                console.log('WORK WORK');

                update_footer_mb();

                $('#footer-mb-hidden input[type="hidden"]').each(function() {
                    var inputVal = $(this).attr('value');
                    if (inputVal == "") {
                        $(this).val(updated_value);
                        return false;
                    }
                });

                setTimeout(function(){
                    $('.mb-prodID').css('pointer-events', 'all');
                }, delay);

				current_click.removeClass('icon-moodboard');
				current_click.addClass('icon-moodboard-fill');

             }
         });


    });


    function update_footer_mb() {
        console.log('update footer moodboard function');
        $.ajax(
            {
                 type: 'POST',
                 url: prefix_vars.ajaxurl,
                 data: {
                    action: 'return_footer_mboard',
                 },
                 success: function( data ) {
                    $('.fm-box').replaceWith(data);
                 }
        });
    }


});




