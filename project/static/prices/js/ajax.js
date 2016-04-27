/**
 * Created by maxbook on 29/03/16.
 */
jQuery(document).ready(function ($) {

    //REFRESH
    on_refresh($(this).serializeArray());

    //LOGIN
    $('#form-signin').submit(function (e) {
        e.preventDefault();
        on_login($(this).serializeArray());
    });

    //CREATE PRODUCT
    $('#form-product').submit(function (e) {
        e.preventDefault();
        create_product($(this).serializeArray());
    });

    //CREATE OFFER
    $('#form-offer').submit(function (e) {
        e.preventDefault();
        create_offer($(this).serializeArray());
    });

    //CREATE CUSTOMER
    $('#form-customer').submit(function (e) {
        e.preventDefault();
        create_customer($(this).serializeArray());
    });

    //UPDATE DATA
    $('#form-profile').submit(function (e) {
        e.preventDefault();
        data = [];
        update_data(data);
    });

    //REGISTER
    $('#form-register').submit(function (e) {
        e.preventDefault();
        on_register($(this).serializeArray());
    });

    //LOGOUT
    $('#form-signout').submit(function (e) {
        on_logout();
    });

});