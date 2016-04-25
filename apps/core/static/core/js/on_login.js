/**
 * Created by maxbook on 31/03/16.
 */
function on_login(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_LOGIN,
        data,
        function (data) {
            if (data.success) {
                $('#login_register').modal('hide');
            } else {

            }
        }
    )
}

function create_product(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_CREATE_PRODUCT,
        data,
        function (data) {
            if (data.success) {
                $('#profile').trigger('click');
            }
        }
    )
}

function create_offer(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_CREATE_OFFER,
        data,
        function (data) {
            if (data.success) {
                $('#profile').trigger('click');
            }
        }
    )
}

function create_customer(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_CREATE_CUSTOMER,
        data,
        function (data) {
            if (data.success) {
                $('#profile').trigger('click');
            }
        }
    )
}


