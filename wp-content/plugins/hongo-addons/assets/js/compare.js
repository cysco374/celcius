( function( $ ) {



    "use strict";

    

    /* Window ready event start code */

    $(document).ready(function () {



        /* Product compare on click */

        $( document ).on( 'click', '.hongo-compare', function() {



            var _this = $( this );

            // $( '.hongo-compare-popup' ).css( 'display','block' );

            $( '.hongo-compare-popup' ).css( 'visibility','visible' ).css( 'opacity','1' );



            _this.find('.compare-text').text( hongoAddons.compare_added_text );

            _this.find('i').attr('data-original-title', hongoAddons.compare_added_text );

                        

            var productId   = $( this ).attr( 'data-product_id' );



            if( productId != '' && productId != undefined ) { // Check product id



                var cookie_name = 'hongo-compare'+hongoAddons.site_id;

                var productIds  = getHongoAddonsCookie( cookie_name );



                if( productIds != '' && productIds != undefined ) { // Check stored value



                    productIds = productIds.split(',');

                    if( $.inArray( productId, productIds ) == '-1' ) { // Check duplicate value

                        productIds.push( productId );

                    }



                } else { // Check array is not created



                    productIds = new Array();


                    productIds.push( productId );

                }



                // Set cookie

                setHongoAddonsCookie( cookie_name, productIds, '1' );



                $.ajax({

                    type: 'POST',

                    url: hongoAddons.ajaxurl, 

                    data: {

                        'action':'compare_details',

                        'productid' : productId

                    },

                    beforeSend: function() {

                        _this.addClass( 'loading' );

                    },

                    success:function(response) {



                        if( $( '#hongo_compare_popup' ).length > 0 ) {



                            $( '#hongo_compare_popup' ).html( response );

                            

                            // odd even class in li

                            $( ".compare-table li:odd" ).addClass('odd');

                            $( ".compare-table li:even" ).addClass('even');



                            // For checkbox Filter

                            $( '.hongo-compare-product-filter-opt' ).on( 'click', function() {                            



                                if( $(this).hasClass('active') ) {

                                    $(this).removeClass('active');

                                } else{

                                    $(this).addClass('active');

                                }

                            });



                            _this.removeClass( 'loading' );



                            // Compare data equal height

                            $( '#hongo_compare_popup' ).imagesLoaded().progress( function() {



                                var max_height = 0;

                                $( '#hongo_compare_popup' ).find( '.content-left ul.compare-table li' ).each(function(index) {



                                    max_height = $( this ).height();



                                    $( '.content-right .compare-table' ).find( 'li:eq(' + index + ')' ).each( function( i ) {



                                        if( max_height < $(this).height() ) {

                                            max_height = $(this).height();

                                        }

                                    });



                                    $( '.compare-table' ).find( 'li:eq(' + index + ')' ).height( max_height );

                                });

                            });

                        

                            // Open popup for compare list

                            if( $.inArray( 'jquery-magnific-popup', hongoAddons.disable_scripts ) < 0 ) {



                                $.magnificPopup.close();



                                $.magnificPopup.open({

                                    items: {

                                        src: '#hongo_compare_popup',

                                        type: 'inline'

                                    },

                                    fixedContentPos: true,

                                    mainClass: 'mfp-fade compare-details-popup-wrap hongo-mfp-bg-white hongo-compare-popup',

                                    callbacks: {

                                        elementParse: function(item) {



                                            // Main ul width count dynamically

                                            hongoAddonsCompareProductFilterCSS();



                                            // Custom Horizontal Scroll Bar

                                            hongoAddonsCustomHorizontalScroll( '.compare-popup-main-content .content-right' );



                                            // Custom Vertical Scroll Bar

                                            hongoAddonsCustomVerticalScroll( '.compare-popup-main-content' );



                                            // Compare details open popup trigger

                                            $( document.body ).trigger( 'hongo_addons_compare_details_open_popup' );

                                        }

                                    }

                                });

                            }

                        }

                    }

                });

            }

        });



        /* Remove product from compare products */

        $( document ).on( 'click', 'a.hongo-compare-product-remove', function() {



            // Remove Product loader

            var compare_loader = null;

            var cart_button_object  = $( this );

            var productId           = cart_button_object.attr( 'data-product_id' );



            if( productId != '' && productId != undefined ) { // Check product id

                if( confirm( hongoAddons.compare_remove_message ) ) {

                    

                    var cookie_name = 'hongo-compare'+hongoAddons.site_id;

                    var productIds  = getHongoAddonsCookie( cookie_name );

                    if( productIds != '' && productIds != undefined ) { // Check stored value

                        cart_button_object.parents('li.list-details').append('<div class="hongo-loader"></div>');

                        productIds = productIds.split(',');

                        productIds.splice( productIds.indexOf( productId ), 1 );



                        // Set removed cookie

                        var cookie_name = 'hongo-compare'+hongoAddons.site_id;

                        setHongoAddonsCookie( cookie_name, productIds, '1' );



                        cart_button_object.parents( 'li' ).remove();

                        $('.hongo-compare[data-product_id = '+productId+']').find( '.compare-text' ).text( hongoAddons.compare_text );

                        $('.hongo-compare[data-product_id = '+productId+']').find('i').attr('data-original-title', hongoAddons.compare_text );



                        // Main ul width count dynamically

                        hongoAddonsCompareProductFilterCSS();

                        

                        // Custom Horizontal Scroll Bar

                        hongoAddonsCustomHorizontalScroll( '.compare-popup-main-content .content-right' );



                        // Custom Vertical Scroll Bar

                        hongoAddonsCustomVerticalScroll( '.compare-popup-main-content' );



                        // Close popup when compare list is empty

                        if( getHongoAddonsCookie( cookie_name ).length == 0 && $.inArray( 'jquery-magnific-popup', hongoAddons.disable_scripts ) < 0 ) {

                            $('#hongo_compare_popup').magnificPopup( 'close' );

                        }

                                             

                        cart_button_object.find('.hongo-loader').remove();

                    }

                }

            }

        });



        /* Remove product after added into cart from compare products popup on click add to cart button */

        $( document ).on( 'click', 'a.hongo-popup-cart-button', function() {



            var cart_button_object  = $( this );

            var productId           = cart_button_object.attr( 'data-product_id' );



            if( productId != '' && productId != undefined ) { // Check product id



                // hide add to cart button

                setTimeout( function() {



                    cart_button_object.parents( 'li' ).find( '.hongo-popup-cart-button' ).fadeOut();



                }, 100 );

            }

        });



        /* Click Filter Button in compare products popup */

        $( document ).on( 'click', '.hongo-compare-filter', function() {

                

            var filter_button_object    = $( this );

            var $checkboxes             = $('.hongo-compare-product-filter-opt.active');

            var countCheckedCheckboxes  = $checkboxes.length;



            if( countCheckedCheckboxes >= 2 ) {

                if( ! ( $( '.compare-error-msg' ).hasClass('display-none') ) ) {



                   $( '.compare-error-msg' ).addClass('display-none');

                }

                filter_button_object.parents( '.hongo-compare-popup' ).find( '.list-details' ).addClass( 'display-none' );

                $.each( $( $checkboxes ), function() {

                    $( this ).parents( '.list-details' ).removeClass( 'display-none' );

                });



                // Main ul width count dynamically

                hongoAddonsCompareProductFilterCSS();



                // Custom Scroll Bar

                if( $.inArray( 'hongo-mcustomscrollbar', hongoAddons.disable_scripts ) < 0 ) {

                    $(".compare-popup-main-content .content-right").mCustomScrollbar("update");

                }



            } else {

                $( '.compare-error-msg' ).removeClass('display-none');

                

                clearTimeout(filter_link);

                filtermessage();

            }

        });



        /* Click Reset Button in compare products popup */

        $( document ).on( 'click', '.hongo-compare-reset', function() {



            $( 'ul.compare-lists-wrap li' ).removeClass( 'display-none' );

            $( '.hongo-compare-product-filter-opt' ).removeClass( 'active' );

            $( '.compare-popup-main-content .content-right' ).css( 'width', '' );

            

            // Main ul width count dynamically

            hongoAddonsCompareProductFilterCSS();

            

            // Custom Scroll Bar

            if( $.inArray( 'hongo-mcustomscrollbar', hongoAddons.disable_scripts ) < 0 ) {

                $(".compare-popup-main-content .content-right").mCustomScrollbar("update");

            }

        });

        

        // Compare data equal height after clicking from quick view

        $( document ).on( 'hongo_quick_view_product_details_open_popup', function() {



            // Main ul width count dynamically

            hongoAddonsCompareProductFilterCSS();



            // Custom Scroll Bar

            hongoAddonsCustomHorizontalScroll( '.compare-popup-main-content .content-right' );

        });



        /* Compare Filter message timeout Funstion */

        var filter_link = null;

        function filtermessage() {

            

            filter_link = setTimeout(function(){

                $( '.compare-error-msg' ).addClass('display-none');

            }, 3000);

        }



    }); /* Window ready event end code */



    /* Product Compare Funstion */

    function hongoAddonsCompareProductFilterCSS() {



        // Main ul width count dynamically

        var t   = $( '.compare-lists-wrap' ),

            tW  = 0;



        $( 'li.list-details:not( .display-none )', t ).each( function() {

            tW += $( this ).outerWidth( true );

        });

        t.css('width', tW + t.outerWidth( true ) - t.width() );

    }



    /* Custom Horizontal Scroll Bar Function */

    function hongoAddonsCustomHorizontalScroll( key ) {



        if (typeof key === "undefined" || key === null || key === '') { 

            key = '.compare-popup-main-content .content-right, .top-sidebar-scroll, .size-guide-content'; 

        }



        /* Horizontal Custom Scrollbar - Compare popup, Top sidebar */

        if( $.inArray( 'hongo-mcustomscrollbar', hongoAddons.disable_scripts ) < 0 ) {

            $( key ).mCustomScrollbar({

                axis:"x", // horizontal scrollbar

                scrollInertia: 100,

                scrollButtons:{

                    enable:false

                },

                keyboard:{

                    enable: true

                },

                mouseWheel:{

                    enable:false,

                    scrollAmount:200

                },

                advanced:{

                    updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/

                    autoExpandHorizontalScroll:true, /*auto-expand width for horizontal scrolling: boolean*/

                }

            });

        }

    }



    /* Custom Vertical Scroll Bar Function */

    function hongoAddonsCustomVerticalScroll( key ) {



        if (typeof key === "undefined" || key === null || key === '') { 

            key = '.compare-popup-main-content'; 

        }



        /* Vertical Custom Scrollbar - Compare popup, Top sidebar */

        if( $.inArray( 'hongo-mcustomscrollbar', hongoAddons.disable_scripts ) < 0 ) {

            $( key ).mCustomScrollbar({

                axis:"y", // vertical scrollbar

                scrollInertia: 100,

                scrollButtons:{

                    enable:false

                },

                keyboard:{

                    enable: true

                },

                mouseWheel:{

                    enable:true,

                    scrollAmount:200

                },

                advanced:{

                    updateOnContentResize:true, /*auto-update scrollbars on content resize (for dynamic content): boolean*/

                    autoExpandHorizontalScroll:true, /*auto-expand width for horizontal scrolling: boolean*/

                }

            });

        }

    }



    /* Set Hongo Cookie Function */

    function setHongoAddonsCookie(cname, cvalue, exdays) {

        var d = new Date();

        d.setTime(d.getTime() + (exdays*24*60*60*1000));

        var expires = ( exdays != 0 && exdays != '' ) ? d.toUTCString() : 0;

        document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/";

    }



    /* Remove Hongo Cookie Function */

    function getHongoAddonsCookie(cname) {

        var name = cname + "=";

        var decodedCookie = decodeURIComponent(document.cookie);

        var ca = decodedCookie.split(';');

        for(var i = 0; i <ca.length; i++) {

            var c = ca[i];

            while (c.charAt(0) == ' ') {

                c = c.substring(1);

            }

            if (c.indexOf(name) == 0) {

                return c.substring(name.length, c.length);

            }

        }

        return "";

    }

})( jQuery );