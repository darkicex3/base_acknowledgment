jQuery(document).ready(function ($) {

    $('.username').bigtext();
    window.display_mode = 'list';
    $("table").tablesorter(); 

    resize_content('.mini-article .list');
    resize_vertical('.left-sidebar');
    resize_vertical('.menu-right');
    resize_content('.results');
    // resize_modal('.modal-dialog');


    var body = $('body');
    var left_sidebar = $('.left-sidebar');

    left_sidebar.perfectScrollbar();

    get_shortcuts(undefined);
    get_list_articles('Home', $(this), undefined, window.display_mode);

    action_acticle('#favorite', 'favorite', 'favorite_border', SET_FAVORITE, 'favorite');
    action_acticle('#note', 'useful', 'color_bigup', SET_USEFUL, '');

    ActionRightBar('.help-action', $('.help'));
    ActionRightBar('.notifications-action', $('.notifications'));
    ActionRightBar('.settings-action', $('.settings'));

    OnClickShortcutsSetSelected();
    OnMouseEnterMouseLeaveTags();
    OnClickShortcutsShowTrees();
    OnClickBookmarkGetArticlesByBookmark();
    OnClickSearchBarSetEditable();

    body.on('click', '.guideText', function (e)             { get_list_articles(undefined, $(this), 'tags', window.display_mode);});
    body.on('click', '.feedback', function (e)              { read($(this), SET_READ); });
    body.on('click', '.link-title-article', function (e)   { get_article($(this)); });

    $(window).resize(function (e) {
        //resize_content('.article', '.modal-content-article');
        resize_content('.mini-article .list');
        resize_vertical('.left-sidebar');
        resize_vertical('.menu-right');
        resize_content('.results');
    });

    // left_sidebar.mouseover(function (e) {
    //     $('body').css('overflow', 'hidden');
    //     $('html').css('overflow', 'hidden');
    //     $('left-sidebar').css('overflow-y', 'scroll !important');
    // });
    //
    // left_sidebar.mouseout(function (e) {
    //     $('body').removeAttr('style');
    //     $('html').removeAttr('style');
    // });

});