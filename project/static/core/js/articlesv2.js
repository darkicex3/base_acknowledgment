/**
 * Created by maxbook on 19/05/16.
 */

window.body = $('body');

/****************      ARTICLE    ******************/

var Article = function (id, element) {
    this.element = element;
    this.id = id;

    this.isLike = function () {
        return this.element.children().first().text() == 'favorite_border'
    };

    this.setLike = function (active, inactive) {
        query_action(this.id, this.isLike(), urls.like_manager);
        design(selector.like_icon, this.isLike(), this.element.children().first(), active, inactive);
    };

    this.isRead = function () {
        return query(urls.read_manager, mode.read);
    };

    this.setRead = function (active, inactive) {
        query(urls.like_manager, mode.write);
        design(this.read_selector, this.isRead(), active, inactive);
    };

    this.isBigup = function () {
        return this.element.children().first().css('color') != 'rgb(52, 152, 219)';
    };

    this.setBigup = function (active, inactive) {
        console.log(this.element.children().first());
        query_action(this.id, this.isBigup(), urls.bigup_manager);
        design(selector.bigup_icon, this.isBigup(), this.element.children().first(), active, inactive)
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
        console.log(this.element.parent().parent().find('.step3'));
        this.element.parent().parent().find('.step3').show();
        this.element.parent().parent().css('height', '100px');

        $.get(urls.send_feedback, {'id': this.id, 'feedback_choice': feedback_choice, 'feedback_text': feedback_text},
            function (data) {
                console.log(data);
            });
    };


    this.isSearch = function () {
        return query(urls.search_manager, mode.read);
    };

    this.setSearch = function () {
        Article.query(urls.like_manager, mode.write);
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
            data['pub_date'], data['tags'], data['read']);
        var statsHTML = stats(data['id'], data['views'], data['useful'], data['loved'], data['bigup'],
            data['favorites']);
        var attachmentsHTML = attachments(data['attachements']);

        // APPEND HTML
        $(selector.body_selector).empty().append(articleHTML);
        $(selector.stats_selector).empty().append(statsHTML);
        $(selector.attachment_selector).empty().append(attachmentsHTML);

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
                console.log(txt);
                article.parent().find('.eta').empty().append(txt + ' read');
            }
        );
    };

    var design = function (element, state, object, active, inactive) {
        switch (element) {
            case selector.like_icon:
                if (state)
                    object.text(inactive || attrclass.unliked);
                else object.text(active || attrclass.liked);
                break;
            case selector.read_icon:
                if (state)
                    object.css(active || style.read);
                else object.css(inactive || style.unread);
                break;
            case selector.bigup_icon:
                if (state)
                    object.css('color', '#3498db');
                else
                    object.removeAttr('style');
                break;
            default:
                break;
        }
    };

    var article = function (key, title, author, content, verified_article, date_publish, tags, read_article) {
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
            '</header>' +
            '<div class="content-article">' + content + '</div>' +
            '<aside class="glossary-article">' + '</aside>' +
            '</div>';
    };

    var stats = function (key, view_counter, useful_counter, favorite_counter, bigup_article, favorites) {
        var color_big = (bigup_article == 'ok' ? 'rgb(52, 152, 219)' : '');
        var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');

        return '<div class="">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<div class="stat-container like-button">' +
            '<i class="center-icon favorite material-icons md-28 width28">'
            + favorite_icon +
            '</i>' +
            '</div>' +
            '<div class="stat-container bigup-button">' +
            '<i class="center-icon color_base useful material-icons md-28 width28" style="color:' + color_big + '">thumb_up</i>' +
            '</div>' +
            '<div class="stat-container comment-button">' +
            '<i class="center-icon material-icons color_base md-28 width28">chat</i>' +
            '</div>' +
            '<div class="stat-container">' +
            '<i class="center-icon material-icons remove_red_eye color_base md-28 width28">remove_red_eye</i>' +
            '</div>' +
            '</div>';
    };

    var attachments = function (attachments) {
        return '<div class="attachment-article">' + attachments + '</div>';
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
        'liked': 'favorite_border',
        'unliked': 'favorite',
        'bigup': {}
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
        article.show();
    };

    var action = function (object) {
        current_article.element = object;

        if (object.attr('class').indexOf('like-button') >= 0)
            current_article.setLike();
        else if (object.attr('class').indexOf('bigup-button') >= 0)
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
        resize_masterfeed();
        resize_iframe();
    };

    var list = function (key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                         useful_counter, bigup_article, last_update, view_counter) {

        return '<tr class="row' + key + '" id="' + key + '">' +
            '<th class="field-title font-list padding-list">' +
            '<a data-toggle="modal" href="#display-article" class="padding-bottom-list link-title-article">' +
            '' + title + '' +
            '</a>' +
            '<br>' + tags + '</th>' +
            '<td class="field-publish_date padding-top-list nowrap">' + date_publish + '</td>' +
            '<td class="field-modified padding-top-list nowrap">' + last_update + '</td>' +
            '<td class="center field-useful_counter padding-top-list">' + useful_counter + '</td>' +
            '<td class="center field-favorite_counter padding-top-list">' + favorite_counter + '</td>' +
            '<td class="center field-view_counter padding-top-list">' + view_counter + '</td>' +
            '</tr>'
    };

    var urls = {
        'get_list_articles': GET_LIST_ARTICLES
    };

    var selector_action = {
        'like_selector': '.like-button',
        'read_selector': '.read-button',
        'bigup_selector': '.bigup-button',
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

    article_content.find('*').each(function () {
        var element = $(this);
        console.log(element.parent().html());
        if (element.width() > element.parent().width()) {
            element.css('width', '100%').css('height', 'auto');
        } else if (element.is('p') && element.html() == '<br>') {
            element.remove();
        }
    });

    var min_height = $(window).height() - 30;
    article_content.css('min-height', min_height);

}

function resize_iframe() {
    $('.mini-article .content').find('iframe').attr('width', '555px').attr('height', '300px');
    $('.mini-article .content').find('img').css('width', '555px');
}


