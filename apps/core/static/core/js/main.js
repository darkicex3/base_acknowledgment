jQuery(document).ready(function ($) {
    
    get_shortcuts(undefined);
    get_articles('Home', $(this));
    action_acticle('#favorite', 'favorite', 'favorite_border', SET_FAVORITE, 'favorite');
    action_acticle('#note', 'useful', 'color_bigup', SET_USEFUL, '');






    $('body').on({
        mouseenter: function() {
            console.log(getCookie('csrftoken'));
            if ($('#search_bar input[name=\'csrfmiddlewaretoken\']').attr('value') != getCookie('csrftoken'))
                alert('gffgdzgfxhg');

            var width = ($(this).width() / 2) - 9;
            $(this).find('.add-tags').css({'left': width}).show(100);
        },
        mouseleave: function() {
            $(this).find('.add-tags').hide();
        }
    }, '.bookmarkBadge');

    // $('body').on('mouseout', '.bookmarkBadge', function (e) {
    //     $(this).children('.action-badge').stop().hide(100);
    // });

    $('body').on('click', '.shortcuts-link', function (e) {
        var selector = $(this).parent().children('.children');

        if (selector.text() != '')
            $(this).parent().children('.children').slideUp(200, function () {
                $(this).empty();
            });
        else {
            get_shortcuts($(this));
        }
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
        $('#search_bar input').attr('placeholder','').empty().css('background', '#3498db').css('font-size','18pt').css('color', '#fff !important').val('#'+$(this).text());
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