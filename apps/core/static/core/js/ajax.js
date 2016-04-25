/**
 * Created by maxbook on 29/03/16.
 */
jQuery(document).ready(function ($) {

    //REFRESH
    on_refresh($(this).serializeArray());

    //LOGIN
    $('#signin_form').submit(function (e) {
        e.preventDefault();
        on_login($(this).serializeArray());
    });

    //LOGOUT
    $('.logout').click(function (e) {
        on_logout();
    });

});