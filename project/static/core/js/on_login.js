/**
 * Created by maxbook on 31/03/16.
 */
function on_login(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_LOGIN,
        data,
        function (data) {
            if (data.success) {
                var url = 'http://darkicex3.alwaysdata.net/ibk/whoman.png';
                $('#login_register').modal('hide');
                $('#img_profile').css('background-image', 'url(' + url + ')');
                $('.username').empty().append(data['username']);
                $('.badge').empty().append(data['points'] + ' pts');
            } else {

            }
        }
    )
}


