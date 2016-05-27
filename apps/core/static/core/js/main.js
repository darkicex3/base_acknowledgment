jQuery(document).ready(function ($) {

    var body = $('body');
    var left_sidebar = $('.left-sidebar');
    resize_left_menu();
    resize_sidebars();

    window.Manager = new ArticleManager();
    window.Manager.initEvents();
    window.Manager.getListArticle(); //category, tags, sorting, counter

    $("table").tablesorter();
    $('.menu-left-menu-container').perfectScrollbar();

    ActionRightBar('.help-action', $('.help'));
    ActionRightBar('.notifications-action', $('.notifications'));
    ActionRightBar('.settings-action', $('.settings'));

    OnClickShortcutsSetSelected();
    OnMouseEnterMouseLeaveTags();
    OnClickShortcutsShowTrees();
    OnClickBookmarkGetArticlesByBookmark();
    OnClickSearchBarSetEditable();
    OnSearchBar();
    OnAttachment();



    window.display_mode = 'list';

    $(".card").flip({ trigger: 'manual' });

    $('#search_sorting').click(function () {
        $(".card").flip('toggle');
    });
    
    



    get_shortcuts(undefined);



    body.on('click', '.guideText', function (e) {
       window.Manager.getListArticle($(this).attr('id'));
    });
    body.on('click', '.feedback', function (e) {
        read($(this), READ_MANAGER);
    });

    $(window).resize(function (e) {
        resize_left_menu();
        resize_sidebars();
        // reposition_stat_glossary();
        //resize_module();
    });
});