jQuery(document).ready(function ($) {
    
    get_shortcuts();
    get_articles('Home', $(this));
    action_acticle('#favorite', 'favorite', 'favorite_border', SET_FAVORITE, 'favorite');
    action_acticle('#note', 'useful', 'color_bigup', SET_USEFUL, '');


    $('body').on('click', '.static_category', function (e) {
        get_articles(undefined, $(this));
    });

    $('body').on('click', '.guideText', function (e) {
        get_articles(undefined, $(this), 'tags');
    });

    $('body').on('click', '.feedback', function (e) {
        read($(this), SET_READ);
    });

    $('body').on('click', '.mini-article header', function (e) {
        show_article($(this));
    });

    $(window).resize(function (e) {
        resize_article('.article');

        resize_article('.mini-article .list');
    });

    $('body').on('click', '.bookmarkLink', function (e) {
        var text = $(this).text();
        console.log(text);
        $('#search_bar input').attr('placeholder','').empty().css('background', '#3498db').css('font-size','18pt').css('color', '#fff !important').val(text);
        $('#search_categories').empty().css('background', '#3498db');
        $('#search_sorting').css('background', '#3498db').find('.sorting').attr('class', 'sorting material-icons color_white md-36 first-item');
        get_articles(undefined, $(this), 'tags');
    });

    $('body').on('click', '#search_bar input', function (e) {
        $(this).val('').removeAttr('style');
        $('#search_categories').removeAttr('style');
        $('#search_sorting').removeAttr('style').find('.sorting').attr('class', 'material-icons color_base md-36 first-item');
        $(this).attr('placeholder','What are you looking for ?');

    });



    $('.article-view').click(function (e) {
        $('.mini-article').css('transition', 'all 500ms');
        $('.mini-article .content').hide();
        $('.mini-article #title').css({'font-size':'12pt'});
        resize_article('.mini-article');
    });

    $('.list-view').click(function (e) {
        $('.mini-article').css('transition', 'none');
        $('.mini-article .content').show();
        $('.mini-article #title').css({'font-size':'20pt'});
        $('.mini-article').css('width','588px');

    });

    $('.left-sidebar').mouseover(function (e) {
        $('body').css('overflow', 'hidden');
        $('html').css('overflow', 'hidden');
        $('left-sidebar').css('overflow-y', 'scroll !important');
    });

    $('.left-sidebar').mouseout(function (e) {
        $('body').removeAttr('style');
        $('html').removeAttr('style');
    });

});