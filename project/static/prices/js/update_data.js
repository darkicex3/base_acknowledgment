/**
 * Created by maxbook on 03/04/16.
 */
function update_data(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.ajax({
        type: 'POST',
        url: AJAX_UPDATE_DATA,
        data: data,
        success:function(data){

            $(".table_customers tbody:not(:first-child)").empty();
            $(".table_offers > tbody:not(:first-child)").empty();
            $(".table_products tbody:not(:first-child)").empty();

            $(".refused_offers h2").empty().append(data.money_refused + ' €');
            $(".accepted_offers h2").empty().append(data.money_accepted + ' €');
            $(".waiting_offers h2").empty().append(data.money_waiting + ' €');



            product_list = [], offer_list = [], customer_list = [], i = 0;

            for (e in data.products)
                show_product(data.products[e]);

            i = 0;
            for (e in data.customers) {
                x = data.customers[e];
                show_customer(x);
            }

            i = 0;
            for (e in data.offers) {
                x = data.offers[e];
                show_offers(x);
            }

            console.log(data);
        },
        error:function(){

        }
    });
}

function show_product(product) {

    $(".table_products > tbody:last-child").append(
        '<tr>' +
            '<th scope="row" style="cursor: pointer">' + i++ + '</th>' +
            '<td>' + product.ref + '</td>' +
            '<td>' + product.cost + '</td>' +
            '<td>' + product.selling_cost + '</td>' +
            '<td>' + product.note + '</td>' +
        '</tr>'
    );
}

function show_customer(customer) {

    $(".table_customers > tbody:last-child").append(
        '<tr>' +
            '<th scope="row" style="cursor: pointer">' + i++ + '</th>' +
            '<td>' + customer.name + '</td>' +
            '<td>' + customer.mail + '</td>' +
            '<td>' + customer.phone + '</td>' +
            '<td>' + customer.city + '</td>' +
            '<td>' + customer.country + '</td>' +
        '</tr>'
    );
}

function show_offers(offer) {

    if (offer.status == 'WAITING')
         var id = 'warning';
    else if(offer.status == 'REFUSED')
         var id = 'danger';
    else var id = 'success';

    $(".table_offers > tbody:last-child").append(
        '<tr class="' + id + '">' +
            '<th scope="row" style="cursor: pointer">' + i++ + '</th>' +
            '<td>' + offer.ref + '</td>' +
            '<td>' + offer.expiration_date + '</td>' +
            '<td>' + offer.date + '</td>' +
            '<td>' + offer.customer.name + '</td>' +
            '<td> <datalist id=browsers ></datalist>' +
            '</td>' +
            '<td>' + offer.status + '</td>' +
        '</tr>'
    );

    for (e in offer.products)
        console.log(offer.products[e].ref);
        $(".table_offers tr td > datalist:last-child").append('<option> ' + offer.products[e].ref + '</option> ')
}