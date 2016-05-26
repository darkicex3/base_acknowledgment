/**
 * Created by maxbook on 19/05/16.
 */

window.body = $('body');

/****************      ARTICLE    ******************/

var Article = function (id, element) {
    this.element = element;
    this.id = id;

    this.isLike = function () {
        console.log(this.element.parent().children().last().attr('class').indexOf('favorite-active'));
        return !(this.element.parent().children().last().attr('class').indexOf('favorite-active') >= 0);
    };

    this.setLike = function (active, inactive) {
        console.log(this.isLike());
        var counter = this.element.parent().children('.counter');
        console.log(counter);
        query_action(this.id, this.isLike(), urls.like_manager);
        design(selector.like_icon, this.isLike(), counter, active, inactive);
    };

    this.isBigup = function () {
        return !(this.element.parent().children().last().attr('class').indexOf('bigup-active') >= 0);
    };

    this.setBigup = function (active, inactive) {
        console.log(this.isBigup());
        var counter = this.element.parent().children('.counter');
        console.log(counter);
        query_action(this.id, this.isBigup(), urls.bigup_manager);
        design(selector.bigup_icon, this.isBigup(), counter, active, inactive)
    };

    this.isRead = function () {
        return query(urls.read_manager, mode.read);
    };

    this.setRead = function (active, inactive) {
        query(urls.like_manager, mode.write);
        design(this.read_selector, this.isRead(), active, inactive);
    };

    this.isSearch = function () {
        return query(urls.search_manager, mode.read);
    };

    this.setSearch = function () {
        Article.query(urls.like_manager, mode.write);
    };

    this.setView = function () {
        query_action(this.id, true, urls.read_manager);
    };

    this.nextStepFeedback = function () {
        this.element.parent().hide();
        this.element.parent().parent().find('.step2').show();
    };

    this.backStepFeedback = function () {
        this.element.parent().hide();
        this.element.parent().parent().find('.step1').show();
    };

    this.giveNewFeedback = function () {
        this.element.parent().hide();
        this.element.parent().parent().find('.step1').show();
    };

    this.changeMarkFeedback = function () {
        var state = this.element.attr('class');
        var element = this.element;

        if (!state.indexOf('selected') >= 0) {
            element.parent().find('.mark').each(function () {
                if ($(this).attr('class').indexOf('selected') >= 0)
                    $(this).attr('class', element.attr('class'));
            });
            element.attr('class', element.attr('class') + ' selected');
        }
    };

    this.sendFeedback = function () {
        var feedback_choice = this.element.parent().parent().find('.selected').attr('id');
        var feedback_text = this.element.parent().find('#explainus').val();

        this.element.parent().hide();
        this.element.parent().parent().find('.step3').show();

        $.get(urls.send_feedback, {'id': this.id, 'feedback_choice': feedback_choice, 'feedback_text': feedback_text},
            function (data) {
            });
    };

    var query_action = function (id, bool, url) {
        $.get(url,
            {'id': id, 'action': bool},
            function (data) {

            }
        );
    };
    this.show = function () {
        query(this.id);
    }; // OK

    var results = function (data, display) {
        var result = '';

        // GET HTML
        var articleHTML = article(data['id'], data['title'], data['author'], data['desc'], data['ok'],
            data['pub_date'], data['tags'], data['read'], data['attachements']);
        var statsHTML = stats(data['id'], data['views'], data['useful'], data['loved'], data['bigup'],
            data['favorites']);

        // APPEND HTML
        $(selector.body_selector).empty().append(articleHTML);
        $(selector.stats_selector).empty().append(statsHTML);

        // RENDER HTML
        render_article();

    }; // OK

    var query = function (id) {
        $.get(urls.get_article,
            {'id': id},
            function (data) {
                results(data);
                Pace.restart();
                var article = $('.content-article');

                article.readingTime({
                    readingTimeTarget: article.parent().find('.eta'),
                    wordCountTarget: article.parent().find('.word-count'),
                    wordsPerMinute: 275,
                    round: true,
                    lang: 'en',
                });

                var txt = article.parent().find('.eta').text();
                article.parent().find('.eta').empty().append(txt + ' read');
            }
        );
    };

    var design = function (element, state, object, active, inactive) {
        switch (element) {
            case selector.like_icon:
                if (state) {
                    object.attr('class', active || attrclass.liked);
                    object.text(parseInt(object.text()) + 1);
                }
                else {
                    object.attr('class', inactive || attrclass.unliked);
                    object.text(parseInt(object.text()) - 1);
                }
                break;
            case selector.read_icon:
                if (state)
                    object.css(active || style.read);
                else object.css(inactive || style.unread);
                break;
            case selector.bigup_icon:
                if (state) {
                    object.attr('class', active || attrclass.bigup);
                    object.text(parseInt(object.text()) + 1);
                }
                else {
                    object.attr('class', inactive || attrclass.unbigup);
                    object.text(parseInt(object.text()) - 1);
                }
                break;
            default:
                break;
        }
    };

    var article = function (key, title, author, content, verified_article, date_publish, tags, read_article, attachments) {
        var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
        var readed = (read_article == 'ok' ? 'readed' : 'unreaded');

        return '<div class="article shadow_material">' +
            '<div class="secondHeader">' +
            '<span class="tags-section txt">' + tags + '</span>' +
            '<i class="schedule-icon material-icons color_view md-18 width18">schedule</i>' +
            '<span class="schedule-txt txt">' + date_publish + '</span>' +
            '<span class="dotDivider">.</span>' +
            '<p><small><span class="eta"></span></small></p>' +
            '</div>' +
            '<header class="header-article">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<a class="article-title">' + title +
            '<i class="material-icons ' + color_read + '">done_all</i></a>' +
            '<i class="attachment-button material-icons color_base md-24">attach_file</i>' +
            '<div class="attachment-article" style="display: none">' + attachments + '</div>' +
            '</header>' +
            '<div class="content-article">' + content + '</div>' +
            '<aside class="glossary-article">' + '</aside>' +
            '</div>';
    };

    var stats = function (key, view_counter, useful_counter, favorite_counter, bigup_article, favorites) {
        var active_bigup = (bigup_article == 'ok' ? 'bigup-active' : '');
        var active_favorite = (favorites == 'ok' ? 'favorite-active' : '');

        return '<div class="">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +

            '<div class="stat-container like-button">' +
            '<i class="center-icon color_base_favorite favorite material-icons md-24 width24">favorite</i>' +
            '<span class="counter counter-like ' + active_favorite + '">' + favorite_counter + '</span>' +
            '</div>' +

            '<div class="stat-container bigup-button">' +
            '<i class="center-icon color_bigup useful material-icons md-24 width24">thumb_up</i>' +
            '<span class="counter counter-bigup ' + active_bigup + '">' + useful_counter + '</span>' +
            '</div>' +

            '<div class="stat-container view-button">' +
            '<i class="center-icon material-icons remove_red_eye color_base md-24 width24">remove_red_eye</i>' +
            '<span class="counter counter-view">' + view_counter + '</span>' +
            '</div>' +
            '</div>';
    };

    var mode = {
        'read': 'r',
        'write': 'w'
    };

    var selector = {
        'body_selector': '.modal-body-article',
        'stats_selector': '.modal-stats-article',
        'comment_selector': '.modal-comments-article',
        'attachment_selector': '.modal-attachments-article',
        'like_selector': '.like-button',
        'like_icon': '.favorite',
        'read_selector': '.read-button',
        'bigup_selector': '.bigup-button',
        'bigup_icon': '.useful'
    };

    var attrclass = {
        'base': {},
        'liked': 'counter counter-like favorite-active',
        'unliked': 'counter counter-like',
        'unbigup': 'counter counter-bigup',
        'bigup': 'counter counter-bigup bigup-active'
    };

    var style = {
        'read': {},
        'unread': {}
    };

    var urls = {
        'like_manager': LIKE_MANAGER,
        'read_manager': READ_MANAGER,
        'bigup_manager': BIGUP_MANAGER,
        'search_manager': SEARCH_MANAGER,
        'get_article': GET_ARTICLE,
        'send_feedback': SEND_FEEDBACK
    };
};


/****************      ARTICLE MANAGER    ******************/

var ArticleManager = function (options) {
    var results_selector = '.table-article tbody';
    var link_article_selector = '.link-title-article';
    var attachment_selector = '';
    this.display = 'list';
    this.counter = 20;
    this.category = 'Home';
    this.sorting = 'publish_date';
    var current_article = null;

    this.getListArticle = function (category, tags, sorting, counter) {
        var count = counter || this.counter;
        var cat = category || this.category;
        var sort = sorting || this.sorting;

        query(cat, tags, count, sort);
    };

    this.initEvents = function () {
        window.body.on("click", link_article_selector, function () {
            article($(this))
        });

        for (var element in selector_action) if (selector_action.hasOwnProperty(element))
            window.body.on("click", selector_action[element], function () {
                action($(this))
            });
    };

    var query = function (by, sorting, counter) {
        $.get(urls.get_list_articles,
            {'by': by, 'counter': counter, 'sorting': sorting},
            function (data) {
                results(data);
                Pace.restart();
            }
        );
    };

    var article = function (object) {
        var article = new Article(object.parent().parent().attr("id"), object.parent().parent());
        current_article = article;
        article.setView();
        article.show();
    };

    var action = function (object) {
        current_article.element = object;

        if (object.attr('class').indexOf('favorite') >= 0)
            current_article.setLike();
        else if (object.attr('class').indexOf('useful') >= 0)
            current_article.setBigup();
        else if (object.attr('class').indexOf('button-next-step-feedback') >= 0)
            current_article.nextStepFeedback();
        else if (object.attr('class').indexOf('button-back-step-feedback') >= 0)
            current_article.backStepFeedback();
        else if (object.attr('class').indexOf('button-step3-step-feedback') >= 0)
            current_article.giveNewFeedback();
        else if (object.attr('class').indexOf('mark') >= 0)
            current_article.changeMarkFeedback();
        else if (object.attr('class').indexOf('submit-feedback') >= 0)
            current_article.sendFeedback();
    };

    var results = function (data, display) {
        var result = '';

        for (var key in data) if (data.hasOwnProperty(key))
            result += list(data[key]['id'], data[key]['title'], data[key]['desc'], data[key]['pub_date'],
                data[key]['loved'], data[key]['tags'], data[key]['favorites'], data[key]['read'],
                data[key]['useful'], data[key]['bigup'], data[key]['modified'], data[key]['views']);

        $(results_selector).empty().append(result).parent().parent().parent().show();
        $("#grid-data").bootgrid();
        $("table").trigger("update");
        resize_iframe();
    };

    var list = function (key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                         useful_counter, bigup_article, last_update, view_counter) {

        return '<tr class="row' + key + '" id="' + key + '" style="position: relative">' +
            '<th class="field-title font-list padding-list">' +
            '<a data-toggle="modal" href="#display-article" class="padding-bottom-list link-title-article">' +
            '' + title + '' +
            '</a>' +
            '<br>' + tags + '</th>' +
            '<td class="field-publish_date padding-top-list nowrap">' + date_publish + '</td>' +
            '<td class="field-modified padding-top-list nowrap">' + last_update + '</td>' +
            '<td class="center field-useful_counter padding-top-list">' + useful_counter + '</td>' +
            '<td class="center field-favorite_counter padding-top-list">' + favorite_counter + '</td>' +
            '<td class="center field-view_counter padding-top-list" style="position: relative">' + view_counter + '<span class="id-article" style="">#'+ key +'</span></td>' +
            '</tr>'
    };

    var urls = {
        'get_list_articles': GET_LIST_ARTICLES
    };

    var selector_action = {
        'like_selector': '.favorite',
        'read_selector': '.read-button',
        'bigup_selector': '.useful',
        'comment-to-step-2': '.button-next-step-feedback',
        'comment-to-step-1': '.button-back-step-feedback',
        'comment-step-3': '.button-step3-step-feedback',
        'send-feedback': 'form-feedback',
        'icon-feedback': '.mark',
        'submit-feedback': '.submit-feedback'
    };

    var selector = {
        'body_selector': '.modal-body-article',
        'stats_selector': '.modal-stats-article',
        'comment_selector': '.modal-comments-article',
        'attachment_selector': '.modal-attachments-article',
        'like_icon': '.favorite'
    }
};


/****************      MISCANELLOUS    ******************/


function resize_masterfeed() {
    var margin = 11;
    var leftbarwidth = $('.left-sidebar').width() + margin * 2;
    var rightbarwidth = $('.right-sidebar').width() + margin * 2;
    var windowwidth = $(window).width();

    $('.master-feed').css('width', windowwidth - (leftbarwidth + rightbarwidth));
    $('.table-article').css('width', windowwidth - (leftbarwidth + rightbarwidth)).css('resize', 'both').css('overflow', 'auto');
}

function resize_sidebars() {
    var windowwidth = $(window).width();
    var masterfeed = $('.master-feed');

    if (windowwidth <= 1310) {
        masterfeed.css('width', '700px');
    } else {
        masterfeed.css('width', '800px');
    }

    var size = ((windowwidth - masterfeed.width()) / 2) - 20;

    $('.left-sidebar').css('width', size);
    $('.right-sidebar').css('width', size);
}

function resize_module() {
    var headerheight = $('header').height();
    var windowheight = $(window).height();
    var rightbarheight = (windowheight - headerheight) - 10;
    var moduleheight = ( rightbarheight / 3 ) - 10;

    $('.right-sidebar').css('height', rightbarheight);
    $('.module').css('height', moduleheight);
}

function render_article() {
    var article_content = $('.modal-content-article');
    var article = $('.article');
    var counter = 0;
    var glossary = '<div class="glossary-header">Glossary<i class="material-icons">library_books</i></div><a class="link-glossary top-article">Header</a>';
    var current_title = '';

    $('.content-article').find('*').each(function () {
        $(this).removeAttr('style');
    });

    article_content.find('*').each(function () {
        var element = $(this);

        if (element.width() > element.parent().width()) {
            element.css('width', '100%').css('height', 'auto');
        }

        if (((element.prev().is('p') || element.prev().is('div')) && (element.prev().html() == '<br>' || element.html() == '<br />'))
            && ((element.is('p') || element.is('div')) && (element.html() == '<br>' || element.html() == '<br />'))) {
            element.remove();
        }

        if ((element.prev().is('h1') || element.prev().is('h2') || element.prev().is('h3') || element.prev().is('h4')
            || element.prev().is('h5') || element.prev().is('h6')) && ((element.html() == '<br>') && (element.is('p') || element.is('div')))) {
            element.remove();
        }

        if (element.is('h1') || element.is('h2') || element.is('h3') || element.is('h4')
            || element.is('h5') || element.is('h6')) {

            counter += 1;
            element.attr('id', 'title' + counter);
            glossary += '<a class="link-glossary" href="#' + 'title' + counter + '">' + element.text() + '</a>';
        }
    });

    glossary += '<a class="bottom-article">Something to say ?</a>';

    var pos = $('.modal-dialog-article').width();
    var bodyw = $(window).width();
    var jbfk4w = ((bodyw - pos) / 2 ) - 210;
    var refiienvi = ((bodyw - pos) / 2 ) - 90;


    console.log(jbfk4w);
    $('.modal-glossary-article').empty().append(glossary).css('right', jbfk4w);
    $('.float-menu-left').css('left', refiienvi);

    $('.link-glossary').click(function () {
        var scroll_elem = $('.modal-dialog-article');
        if ($(this).attr('class') == 'link-glossary top-article') {
            scroll_elem.animate({
                scrollTop: 0
            }, 300);
        } else {
            scroll_elem.animate({
                scrollTop: $($.attr(this, 'href')).offset().top + scroll_elem.scrollTop() - 20
            }, 300);
        }
    });

    $('.bottom-article').click(function () {
        var scroll_elem = $('.modal-dialog-article');
        scroll_elem.animate({
            scrollTop: $('.modal-content-article').height() + scroll_elem.scrollTop()
        }, 300);
    });


    var min_height = $(window).height() - 30;
    article_content.css('min-height', min_height);

}

function resize_iframe() {
    var elem = $('.mini-article .content');
    elem.find('iframe').attr('width', '555px').attr('height', '300px');
    elem.find('img').css('width', '555px');
}


