/**
 * Created by maxbook on 27/04/16.
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

    //AVATAR
    $('#avatar_form').submit(function (e) {
        e.preventDefault();
        change_avatar($(this).serializeArray());
    });


    /* ---------------------------------------- */
    /* LOGIN                                    */
    /* ---------------------------------------- */
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
                    get_shortcuts();
                    get_articles('Home', $(this));
                } else {

                }
            }
        )
    }

    /* ---------------------------------------- */
    /* LOGOUT                                   */
    /* ---------------------------------------- */
    function on_logout() {

        $.get(AJAX_LOGOUT,
            function (data) {
                $('#goodbye').modal('show');
                $('#login_register').modal('show');
        });

    }


});
