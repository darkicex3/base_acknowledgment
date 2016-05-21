/**
 * Created by maxbook on 19/05/16.
 */

window.body = $('body');

/****************      ARTICLE    ******************/

var Article = function (id, element) {
    this.element = element;
    this.id = id;

    this.isLike = function () {
        return this.element.text() == 'favorite_border'
    };

    this.setLike = function (active, inactive) {
        query_like(this.id, mode.write, this.isLike());
        design(selector.like_icon, this.isLike(), this.element, active, inactive);
    };

    this.isRead = function () {
        return query(urls.read_manager, mode.read);
    };

    this.setRead = function (active, inactive) {
        query(urls.like_manager, mode.write);
        design(this.read_selector, this.isRead(), active, inactive);
    };

    this.isBigup = function () {
        return query(urls.bigup_manager, mode.read);
    };

    this.setBigup = function (active, inactive) {
        query(urls.like_manager, mode.write);
        design(this.bigup_selector, this.isBigup(), this.element, active, inactive)
    };

    this.isSearch = function () {
        return query(urls.search_manager, mode.read);
    };

    this.setSearch = function () {
        Article.query(urls.like_manager, mode.write);
    };

    var query_like = function (id, mode, bool) {
        $.get(urls.like_manager,
            {'id': id, 'mode': mode, 'action': bool},
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
                    object.attr('class', active || attrclass.bigup);
                else object.attr('class', inactive || attrclass.base);
                break;
            default:
                break;
        }
    };

    var article = function (key, title, author, content, verified_article, date_publish, tags, read_article) {
        var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
        var readed = (read_article == 'ok' ? 'readed' : 'unreaded');

        return '<div class="article shadow_material">' +
            '<header class="header-article">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<span class="txt">' + tags + '</span>' +
            '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">schedule</i>' +
            '<span class="txt">' + date_publish + '</span>' +
            '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">face</i>' +
            '<span class="txt">' + author + '</span>' +
            '<a class="article-title">' + title +
            '<i class="material-icons ' + color_read + '">done_all</i></a>' +
            '</header>' +
            '<div class="content-article">' + content + '</div>' +
            '<aside class="glossary-article">' + '</aside>' +
            '<footer class="footer-article">' +
            '<div class="feedback ' + readed + '">I have read this article !</div>' +
            '</footer>' +
            '</div>';
    };

    var stats = function (key, view_counter, useful_counter, favorite_counter, bigup_article, favorites) {
        var color_big = (bigup_article == 'ok' ? 'color_bigup' : 'color_base');
        var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');

        return '<div class="">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<div class="stat-container bigup-button">' +
            '<i class="center-icon useful material-icons md-28 width28">thumb_up</i>' +
            '</div>' +
            '<div class="stat-container like-button">' +
            '<i class="center-icon favorite material-icons md-28 width28">'
            + favorite_icon +
            '</i>' +
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
        'bigup_selector': '.bigup-button'
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
        'get_article': GET_ARTICLE
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
    }; // OK

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
    }; // OK

    // QUERY --> GET ARTICLES FROM DB AND APPEND RESULTS TO DOM
    var query = function (by, sorting, counter) {
        $.get(urls.get_list_articles,
            {'by': by, 'counter': counter, 'sorting': sorting},
            function (data) {
                results(data);
                Pace.restart();
            }
        );
    }; // OK

    // KEY --> GET KEY OF ARTICLE CONCERN BY CURRENT ACTION
    var key = function (self) {
        return self.parent().parent().attr("id");
    };

    // OBJ --> GET ARTICLE (DOM OBJ) CONCERN BY CURRENT ACTION
    var obj = function (self) {
        return self.parent().parent();
    };

    // ARTICLE --> ACTION AFTER A CLICK ON TITLE ARTICLE IN LIST
    var article = function (object) {
        var article = new Article(key(object), obj(object));
        current_article = article;
        article.show();
    };

    // READ --> ACTION AFTER A CLICK ON READ BUTTON
    var read = function () {
        var article = new Article(key($(this)), obj($(this)));
        article.setRead();
    };

    // LIKE --> ACTION AFTER A CLICK ON LIKE BUTTON
    var like = function (object) {
        current_article.element = object.children().first();
        current_article.setLike();
    };

    // BIGUP --> ACTION AFTER A CLICK ON BIGUP BUTTON
    var bigup = function () {
        var article = new Article(key($(this)), obj($(this)));
        article.setBigup();
    };

    // COMMENT --> ACTION AFTER A CLICK ON COMMENT BUTTON
    var comment = function () {
        var article = new Article(key($(this)), obj($(this)));
        article.setBigup();
    };

    // ATTACHMENT --> ACTION AFTER A CLICK ON ATTACHMENT BUTTON
    var attachment = function () {
        var article = new Article(key($(this)), obj($(this)));
    };

    // EVENTS --> BIND (Attach a handler to an event for the elements.) EACH BUTTON OF AN ARTICLE TO AN EVENT
    this.initEvents = function () {
        window.body.on("click", link_article_selector, function () {
            article($(this))
        });
        window.body.on("click", selector.like_selector, function () {
            like($(this))
        });
        window.body.on("click", selector.read_selector, function () {
            read($(this))
        });
        window.body.on("click", selector.bigup_selector, function () {
            bigup($(this))
        });
        window.body.on("click", selector.comment_selector, function () {
            comment($(this))
        });
        window.body.on("click", selector.attachment_selector, function () {
            attachment($(this))
        });
    };

    // LIST --> GENERATE THE LIST OF ARTICLES (HTML)
    var list = function (key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                         useful_counter, bigup_article, last_update, view_counter) {

        return '<tr class="row' + key + '" id="' + key + '">' +
            '<th class="field-title font-list padding-list">' +
            '<a data-toggle="modal" href="" data-target="#display-article" class="padding-bottom-list link-title-article" href="#">' +
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

    // URLS --> URL TO MANAGE THE LIST OF ARTICLES SERVER SIDE IN "VIEW.PY"
    var urls = {
        'get_list_articles': GET_LIST_ARTICLES
    };

    var selector = {
        'body_selector': '.modal-body-article',
        'stats_selector': '.modal-stats-article',
        'comment_selector': '.modal-comments-article',
        'attachment_selector': '.modal-attachments-article',
        'like_selector': '.like-button',
        'like_icon': '.favorite',
        'read_selector': '.read-button',
        'bigup_selector': '.bigup-button'
    };
};


/****************      MISCANELLOUS    ******************/


function resize_masterfeed() {
    var margin = 11;
    var leftbarwidth = $('.left-sidebar').width() + margin * 2;
    var rightbarwidth = $('.right-sidebar').width() + margin * 2;
    var windowwidth = $(window).width();

    $('.master-feed').css('width', windowwidth - (leftbarwidth + rightbarwidth));
    $('table').css('width', windowwidth - (leftbarwidth + rightbarwidth)).css('resize', 'both').css('overflow', 'auto');
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
        if (element.width() > element.parent().width()) {
            element.css('width', '100%').css('height', 'auto');
        }
    });

    var min_height = $(window).height() - 30;
    article_content.css('min-height', min_height);

}

function resize_iframe() {
    $('.mini-article .content').find('iframe').attr('width', '555px').attr('height', '300px');
    $('.mini-article .content').find('img').css('width', '555px');
}


