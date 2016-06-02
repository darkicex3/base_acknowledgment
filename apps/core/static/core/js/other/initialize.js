/**
 * Created by maxbook on 31/03/16.
 */
function on_refresh(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});
    $.post(AJAX_ISCO,
            data,
            function (data) {
                if (!data['success']) {
                    $('#login_register').modal('show');
                } else {
                    var url = 'http://darkicex3.alwaysdata.net/ibk/whoman.png';
                    $('#img_profile').css('background-image', 'url(' + url + ')');
                    $('.username').empty().append(data['username']);
                    $('.badge').empty().append(data['points'] + ' pts');
                }
    });
}
