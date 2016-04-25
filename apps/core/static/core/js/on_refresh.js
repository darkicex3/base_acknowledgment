/**
 * Created by maxbook on 31/03/16.
 */
function on_refresh(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});
    $.post(AJAX_ISCO,
            data,
            function (data) {
                if (data['success']) {
                    $('#login_register').modal('show');
                } else {

                }
    });
}
