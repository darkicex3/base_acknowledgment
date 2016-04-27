jQuery(document).ready(function ($) {

    $(".base_menu").mousedown(function (evt) {
            evt.stopImmediatePropagation();
            return false;
    });
    $(".base_menu").selectable();

    get_shortcuts();


    // ARTICLES
    $('body').on('click', '.static_category', function (e) {
        get_articles(undefined, $(this));
    });

    get_articles('Home', $(this));
    action_acticle('#favorite');
    action_acticle('#note');

    $('body').on('click', '.mini-article', function (e) {
        show_article($(this));
    });

    var menu_width = $('.left-sidebar').width() + 60;
    console.log(menu_width);
    var window_width = $(window).width();
    console.log(window_width);
    var article_width = window_width - menu_width;
    console.log(article_width);

    $('.article').css({'width': article_width})




});