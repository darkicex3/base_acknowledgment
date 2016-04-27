/**
 * Created by maxbook on 31/03/16.
 */
function on_logout() {

    $.get(AJAX_LOGOUT,
        function (data) {
            $("#result").html(JSON.stringify(data));
            $('header').fadeOut(500);
            $('.container').fadeIn(500);
            $('.home').fadeOut(400);
            $('.alert-success').fadeOut(400);
            $('.create_action').fadeOut(200);
    });

}