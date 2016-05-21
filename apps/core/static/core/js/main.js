jQuery(document).ready(function ($) {

    window.Manager = new ArticleManager();
    window.Manager.initEvents();
    window.Manager.getListArticle(); //category, tags, sorting, counter








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

    action_acticle('#favorite', 'favorite', 'favorite_border', LIKE_MANAGER, 'favorite');
    action_acticle('#note', 'useful', 'color_bigup', BIGUP_MANAGER, '');

    ActionRightBar('.help-action', $('.help'));
    ActionRightBar('.notifications-action', $('.notifications'));
    ActionRightBar('.settings-action', $('.settings'));

    OnClickShortcutsSetSelected();
    OnMouseEnterMouseLeaveTags();
    OnClickShortcutsShowTrees();
    OnClickBookmarkGetArticlesByBookmark();
    OnClickSearchBarSetEditable();
    OnSearchBar();

    body.on('click', '.guideText', function (e) {
       window.Manager.getListArticle($(this).attr('id'));
    });
    body.on('click', '.feedback', function (e) {
        read($(this), READ_MANAGER);
    });

    $(window).resize(function (e) {
        resize_masterfeed();
        resize_module();
    });
});