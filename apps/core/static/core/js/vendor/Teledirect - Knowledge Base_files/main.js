jQuery(document).ready(function ($) {

    resize_module();
    window.display_mode = 'list';
    $("table").tablesorter();

    $(".card").flip({ trigger: 'manual' });
    $('#search_sorting').click(function () {
        $(".card").flip('toggle');
    });

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
    OnHoverSearchBar();

    body.on('click', '.guideText', function (e) {
        get_list_articles(undefined, $(this), 'tags', window.display_mode);
    });
    body.on('click', '.feedback', function (e) {
        read($(this), SET_READ);
    });
    body.on('click', '.link-title-article', function (e) {
        get_article($(this));
    });

    $(window).resize(function (e) {
        resize_masterfeed();
        resize_module();
    });
});