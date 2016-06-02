jQuery(document).ready(function ($) {

    window.Manager = new ArticleManager();
    window.body = $('body');
    resize_left_menu();
    resize_sidebars();

    window.Manager.initEvents();
    window.Manager.getListArticle(); //category, tags, sorting, counter
    window.Manager.getListDailyRecap();
    window.Manager.getListPolls();

    $("table").tablesorter();
    $('.menu-left-menu-container').perfectScrollbar();
    $('.content-list-daily-recap').perfectScrollbar();

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



    window.body.on('click', '.guideText', function (e) {
       window.Manager.getListArticle($(this).attr('id'));
    });
    window.body.on('click', '.feedback', function (e) {
        read($(this), READ_MANAGER);
    });

    $(window).resize(function (e) {
        resize_left_menu();
        resize_sidebars();
        position_module_article();
        // resize_module();
        // reposition_stat_glossary();
        //resize_module();
    });
});