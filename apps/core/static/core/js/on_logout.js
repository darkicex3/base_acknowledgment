/**
 * Created by maxbook on 31/03/16.
 */
function on_logout() {

    $.get(AJAX_LOGOUT,
        function (data) {
            $('#goodbye').modal('show');
            $('#login_register').modal('show');
    });

}