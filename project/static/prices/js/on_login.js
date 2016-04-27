/**
 * Created by maxbook on 31/03/16.
 */
function on_login(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(AJAX_LOGIN,
        data,
        function (data) {
            if (data.success){
                //Animation menant à l'acceuil
                $('.container').fadeOut(400);
                $('#logout').prop('disabled', true);
                $('header').fadeIn(400,
                    function() {
                        //Apparition du message de bienvenue
                        $('.alert-success').slideDown(200);
                    //Delay le temps de voir le message
                    }).delay(1500)
                      .queue(function() {
                                //Disparition du message de bienvenue
                                $('.alert-success').slideUp(200,
                                function () {
                                    //Tout s'affiche
                                    $('.home').fadeIn(200);
                                    $('.create_action').fadeIn(200);
                                    //Pour éviter que l'utilisateur se déconnecte pendant l'animation
                                    $('#logout').prop('disabled', false);
                                });
                                return $(this).dequeue();
                });
            } else {
                $("#result").html(JSON.stringify(data));
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


