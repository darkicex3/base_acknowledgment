/**
 * Created by maxbook on 27/04/16.
 */

jQuery(document).ready(function ($) {

    $('body').on('click', '.widget-menus ul li a', function (e) {
        $('.widget-menus ul li a').removeAttr('style');
        $(this).css('background-color', '#eee');
    });
});
