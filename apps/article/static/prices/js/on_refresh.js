/**
 * Created by maxbook on 31/03/16.
 */
function on_refresh(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});
    update_data(data);
    $.post(AJAX_ISCO,
            data,
            function (data) {
                if (!data['success']) {
                    $('header').fadeIn(0);
                    $('.container').fadeOut(0);
                    $('.home').fadeIn(0);
                    $('.create_action').fadeIn(0);
                } else {
                    $('.home').hide();
                    $('header').fadeOut(500);
                    $('.container').fadeIn(500);
                    $('.create_action').fadeOut(0);
                }
    });
}
