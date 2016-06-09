jQuery(document).ready(function ($) {

    window.Manager = new ArticleManager();
    window.body = $('body');
    resize_left_menu();
    resize_sidebars();
    design_top_menu('#home');

    window.Manager.initEvents();
    window.Manager.getListArticle(); //category, tags, sorting, counter
    window.Manager.getListDailyRecap();
    window.Manager.getListPolls();


    $('.top-menu').flip({
        axis: 'x',
        trigger: 'manual',
        speed: '250'
    });

    $('#search').click(function () {
        $('.top-menu').flip(true);
        // {'module_1':'popular_tags', 'module_2':'most_searched', 'module_3':'historic'}
        window.Manager.getSearchSuggestions();
    });

    $('#back_search').click(function () {
        $('.top-menu').flip(false);
    });

    $('.menu-button').click(function () {
        window.nav_wrapper = $('.nav-wrapper');
        window.app = $('.app');
        if (window.nav_wrapper.css('left') == '0px') {
            window.nav_wrapper.css('left', window.nav_wrapper.width() * (-1));
            window.app.css('padding-right', '5%').css('padding-left', '5%');
        }
        else {
            window.app.removeAttr('style');
            window.nav_wrapper.css('left', '0');
        }
    });


    $('.nav-wrapper').perfectScrollbar();

    ActionRightBar('.help-action', $('.help'));
    ActionRightBar('.notifications-action', $('.notifications'));
    ActionRightBar('.settings-action', $('.settings'));

    OnClickShortcutsSetSelected();
    OnMouseEnterMouseLeaveTags();
    OnClickBookmarkGetArticlesByBookmark();
    OnClickSearchBarSetEditable();
    OnSearchBar();
    OnAttachment();

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
        $('.nav-wrapper').css('left', window.nav_wrapper.width() * (-1));
        // resize_module();
        // reposition_stat_glossary();
        //resize_module();
    });
});