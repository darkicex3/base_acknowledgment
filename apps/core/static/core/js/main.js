jQuery(document).ready(function ($) {

    get_shortcuts();

    $('body').on('click', '.static_category', function (e) {
        get_articles(undefined, $(this));
    });

    get_articles('Home', $(this));

    action_acticle('#favorite');

    action_acticle('#note');
    
});