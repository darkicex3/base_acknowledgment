/**
 * Created by maxbook on 27/04/16.
 */

function get_articles(category, element, tags) {
    if (typeof category == 'undefined')
        category = element.attr('id');

    if (typeof tags != 'undefined'){
        tags = element.text();
    }

    console.log(tags);

    $.get(GET_ARTICLES_BY_STATIC_SHORTCUTS,
        {'get_articles_by': category, 'get_articles_by_tags':tags},

        function (data) {
            if (typeof (data['msg']) != 'undefined') {
                var html = '<div style="width: 588px;font-size:20pt;">' + data['msg'] + '</div>';
            } else {
                var html = '';
                for (var key in data) {
                    html += mini_article(data[key]['id'],
                        data[key]['title'],
                        data[key]['desc'],
                        data[key]['pub_date'],
                        data[key]['loved'],
                        data[key]['tags'],
                        data[key]['favorites'],
                        data[key]['read'],
                        data[key]['useful'],
                        data[key]['bigup']);
                }

            }

            $('#feed').empty().append(html);
            resize_iframe();
            resize_img();
        }
    );
}

function resize_article(element) {
    var menu_width = $('.left-sidebar').width() + 60;
    var window_width = $(window).width();
    var article_width = window_width - menu_width;
    $(element).css({'width': article_width});
    $('.content-article p').css({'font-family': '\'EB Garamond\' !important'});
}

function resize_iframe() {
    $('.mini-article .content').find('iframe').attr('width', '555px').attr('height', '300px');
}

function resize_img() {
    $('.mini-article .content').find('img').css({'width': '555px'});
}

function show_article(element) {
    var id = element.parent().find('.key').attr('id');
    console.log(id);
    $.get(SHOW_ARTICLE, {'article_id': id},
        function (data) {
            var html = article( data['id'],
                                data['title'],
                                data['author'],
                                data['desc'],
                                data['ok'],
                                data['pub_date'],
                                data['views'],
                                data['useful'],
                                data['loved'],
                                data['tags'],
                                data['favorites'],
                                data['read'],
                                data['bigup'],
                                data['attachements']);

            $('#feed').empty().append(html);
            resize_article('.article');
        }
    )
}

function article(key, title, author, content, verified_article, date_publish, view_counter, useful_counter,
                 favorite_counter, tags, favorites, read_article, bigup_article, attachments) {


    var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');
    var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
    var readed = (read_article == 'ok' ? 'readed' : 'unreaded');
    var color_big = (bigup_article == 'ok' ? 'color_bigup' : 'color_base');

    console.log(readed);


    return '<div class="article shadow_material">' +
        '<header class="header-article">' +
        '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
        '<a class="bookmark">' +
        '<span class="txt">' + tags + '</span>' +
        '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">schedule</i><span class="txt">' + date_publish + '</span>' +
        '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">face</i><span class="txt">' + author + '</span>' +
        '</a>' +

        '<a class="article-title">' + title +
        '<i class="material-icons ' + color_read + '">done_all</i></a>' +

        '<div class="stat-article">' +
        '<p id="note" style="display: inline"><i class="useful material-icons md-18 width18 ' + color_big + '">thumb_up</i><span class="useful_counter">' + useful_counter + '</span></p>' +
        '<p id="favorite" style="display: inline; margin-left: 30px"><i class="favorite material-icons md-18 width18 color_base_favorite">' + favorite_icon + '</i><span class="favorite_counter">' + favorite_counter + '</span></p>' +
        '<i class="material-icons remove_red_eye color_base md-18 width18">remove_red_eye</i>' + view_counter +
        '</div>' +

        '</header>' +

        '<div class="attachment-article">' +
            attachments +
            // '<i class="material-icons .close md-24 width24">close</i>' +
            // '<i class="material-icons refresh md-24 width24">refresh</i>' +
            // '<i class="material-icons more_horiz md-24 width24">more_vert</i>' +
            // '<i class="material-icons expand_more md-24 width24">expand_more</i>' +
        '</div>' +

        '<div class="content-article">' +
        content +
        '</div>' +

        '<aside class="glossary-article">' +

        '</aside>' +

        '<footer class="footer-article">' +
        '<div class="feedback ' + readed + '">I have read this article !</div>' +
        '</footer>' +
        '</div>';
}

function mini_article(key, title, description, date_publish, favorite_counter,
                      tags, favorites, read_article, useful_counter, bigup_article) {

    var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');
    var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
    var color_big = (bigup_article == 'ok' ? 'color_bigup' : 'color_base');


    return  '<div class="mini-article">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<header>' +
            '<a id="title">' + title + '</a>' +
            '<a id="secure"><i class="material-icons md-18 width18 ' + color_read + '">done_all</i></a>' +
            '</header>' +
            '<div class="content"><p>' + description + '</p></div>' +
            '<footer class="footer-mini-article">' +
            '<p id="pub_date"><i class="material-icons md-18 width18 color_base">schedule</i>' + date_publish + '</p>' +
            '<p id="note" style="color: #95a5a6"><i class="useful material-icons md-18 width18 ' + color_big + '">thumb_up</i><span class="useful_counter">' + useful_counter + '</span></p>' +
            '<p id="favorite" style="color: #95a5a6;margin-left: 20px;"><i class="favorite material-icons md-18 width18 color_base_favorite">' + favorite_icon + '</i><span class="favorite_counter">' + favorite_counter + '</span></p>' +
            '<p id="bookmark" style="color: #95a5a6; float: right;"><i class="material-icons md-18 width18 color_base"></i>' + tags + '</p>' +
            '</footer>' +
            '</div>'
}

function action_acticle(element, class_name, form_change, url, form_base) {
    $('body').on('click', element, function (event) {

    var selector = $(this).parent().find('.' + class_name);
    var action = false;

        if(element == '#favorite') {
            if ($(selector).text() != form_base) {
                $(selector).text(form_base);
                action = true;
            } else
                $(selector).text(form_change);

            var article_id = $(this).parent().parent().find('.key').attr("id");

            $.get(url, {'action': action, 'article_id': article_id}, function (data) {
                selector.parent().find('.' + class_name + '_counter').empty().append(data[class_name + '_counter']);
            });
        }

        if(element == '#note') {

            if (selector.attr('class') == class_name + ' material-icons md-18 width18 color_base') {
                selector.attr('class', class_name + ' material-icons md-18 width18 ' + form_change);
                action = true;
            } else
                selector.attr('class', class_name + ' material-icons md-18 width18 color_base');

            var article_id = $(this).parent().parent().find('.key').attr("id");
            $.get(url, {'action': action, 'article_id': article_id}, function (data) {
                console.log(selector.parent().find('.' + class_name + '_counter').empty().append(data[class_name + '_counter']));
            });
        }

    });
}

function read(element, url) {
    var style = element.attr('class');
    var action = 'false';
    var article_id = element.parent().parent().find('.key').text();

    console.log(style, action, article_id);
    if (style == 'feedback unreaded') {
        element.attr('class', 'feedback readed');
        action = 'true';
    }
    else
        element.attr('class', 'feedback unreaded');

    console.log(style, action, article_id);

    $.get(url, {'action': action, 'article_id': article_id}, function (data) {});

}


