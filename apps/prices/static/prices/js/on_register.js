/**
 * Created by maxbook on 31/03/16.
 */
function on_register(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_REGISTER,
        data,
        function (data) {
            $("#result").html(JSON.stringify(data));
    })
    .fail(function (err) {
        $("#result").html(JSON.stringify(err.responseJSON));
    })
}