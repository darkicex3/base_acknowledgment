/**
 * Created by maxbook on 27/04/16.
 */


/********************************************************/
/****************       DISPLAYING     ******************/
/********************************************************/
function display_feedbacks(comments) {
    return 'FEEDBACKS'
}

function display_attachments(attachments) {
    return '<div class="attachment-article">' + attachments + '</div>';
}

function display_actions(key, view_counter, useful_counter, favorite_counter, bigup_article, favorites) {
    // data['views'], data['useful'], data['loved'], data['bigup'], data['favorites']
    var color_big = (bigup_article == 'ok' ? 'color_bigup' : 'color_base');
    var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');

    return  '<div class="">' +
                '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
                '<div class="stat-container"><p id="note" style="display: inline"><i class="useful useful-in-article material-icons md-34 width34 ' + color_big + '">thumb_up</i><span class="counter placement1 useful_counter">' + useful_counter + '</span></p></div>' +
                '<div class="stat-container"><p id="favorite" style="display: inline; margin-left: 30px"><i class="favorite favorite-in-article material-icons md-18 width18 color_base_favorite">' + favorite_icon + '</i><span class="counter placement2 favorite_counter">' + favorite_counter + '</span></p></div>' +
                '<div class="stat-container"><i class="material-icons remove_red_eye color_base md-18 width18">remove_red_eye</i><span class="counter placement3">' + view_counter + '</span></div>' +
            '</div>';
}

function display_article(key, title, author, content, verified_article, date_publish, tags, read_article) {
    var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
    var readed = (read_article == 'ok' ? 'readed' : 'unreaded');

    return      '<div class="article shadow_material">' +

                '<header class="header-article">' +
                    '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
                    '<span class="txt">' + tags + '</span>' +
                    '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">schedule</i><span class="txt">' + date_publish + '</span>' +
                    '<i class="material-icons color_view md-18 width18" style="margin-left: 20px;">face</i><span class="txt">' + author + '</span>' +

                    '<a class="article-title">' + title +
                    '<i class="material-icons ' + color_read + '">done_all</i></a>' +

                '</header>' +

                '<div class="content-article">' + content + '</div>' +
                '<aside class="glossary-article">' + '</aside>' +

                '<footer class="footer-article">' +
                '<div class="feedback ' + readed + '">I have read this article !</div>' +
                '</footer>' +
                '</div>';
}

var display_function = {

    module: function module_display(key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                                useful_counter, bigup_article, last_update, view_counter) {

        var style1 = "position: absolute;display: inline-block;width: 27px;background-color: #2ecc71;border-radius: " +
            "60px;left: -20px;top: -4px;padding: 2px;font-size: 17pt;color: white;transition: all 1s;";
        var style = "font-size: 9pt;color: white;position: relative;top: -1px;padding: 1px 13px 0px 13px;background-color: " +
            "#2ecc71;border-radius: 3px;left: -8px;transition: all 1s;";

        var favorite_icon = (favorites == 'ok' ? 'favorite' : 'favorite_border');
        var color_read = (read_article == 'ok' ? 'color_bigup' : 'color_base');
        var color_big = (bigup_article == 'ok' ? 'color_bigup' : 'color_base');
        var icon_time = (last_update == 'ok' ? 'update' : 'schedule');
        var style_update = (last_update == 'ok' ? style : '');
        var style_update1 = (last_update == 'ok' ? style1 : '');

        return '<div class="mini-article">' +
            '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
            '<header>' +
            '<a id="title">' + title + '</a>' +
            '<a id="secure"><i class="material-icons md-18 width18 ' + color_read + '">done_all</i></a>' +
            '</header>' +
            '<div class="content"><p>' + description + '</p></div>' +
            '<footer class="footer-mini-article">' +
            '<p id="pub_date" style="' + style_update + '"><i style="' + style_update1 + '" class="material-icons ' +
            'md-18 width18 color_base">' + icon_time + '</i>' + date_publish + '</p>' +

            '<p id="note" style="color: #95a5a6"><i class="useful material-icons ' +
            'md-18 width18 ' + color_big + '">thumb_up</i><span class="useful_counter">' + useful_counter + '</span></p>' +

            '<p id="favorite" style="color: #95a5a6;margin-left: 20px;"><i class="favorite material-icons ' +
            'md-18 width18 color_base_favorite">' + favorite_icon + '</i><span class="favorite_counter">' +
            '' + favorite_counter + '</span></p>' +

            '<p id="bookmark" style="color: #95a5a6; float: right;"><i class="material-icons ' +
            'md-18 width18 color_base"></i>' + tags + '</p>' +

            '</footer>' +
            '</div>'
    },

    list: function list_display(key, title, description, date_publish, favorite_counter, tags, favorites, read_article,
                                useful_counter, bigup_article, last_update, view_counter) {

        return '<tr class="row' + key + '" id="' + key + '">' +
            '<th class="field-title font-list padding-list"><a data-toggle="modal" href="http://fiddle.jshell.net/bHmRB/51/show/" data-target="#display-article" class="padding-bottom-list link-title-article" href="#">' + title + '</a><br>' + tags + '</th>' +
            '<td class="field-publish_date padding-top-list nowrap">' + date_publish + '</td>' +
            '<td class="field-modified padding-top-list nowrap">' + last_update + '</td>' +
            '<td class="center field-useful_counter padding-top-list">' + useful_counter + '</td>' +
            '<td class="center field-favorite_counter padding-top-list">' + favorite_counter + '</td>' +
            '<td class="center field-view_counter padding-top-list">' + view_counter + '</td>' +
            '</tr>'
    }
};

function list_display_options(sortpriority) {

    return '<div class="sortoptions">' +
                '<a class="sortremove" href="#" title="Remove from sorting"></a>' +
                '<span class="sortpriority" title="Sorting priority: 2">' + sortpriority + '</span>' +
                '<a href="#" class="toggle ascending" title="Toggle sorting"></a>' +
            '</div>'
}

/********************************************************/
/****************        GETTERS       ******************/
/********************************************************/

function get_article(element) {
    var id = element.parent().parent().attr('id');

    $.get(SHOW_ARTICLE, {'article_id': id},
        function (data) {

            // GET HTML
            var article     =   display_article(data['id'], data['title'], data['author'], data['desc'], data['ok'], data['pub_date'], data['tags'], data['read'] );
            var stats       =   display_actions(data['id'], data['views'], data['useful'], data['loved'], data['bigup'], data['favorites']);
            var comments    =   display_feedbacks ();
            var attachments =   display_attachments( data['attachements'] );

            // APPEND HTML
            $('.modal-body-article').empty().append(article);
            $('.modal-stats-article').empty().append(stats);
            $('.modal-comments-article').empty().append(comments);
            $('.modal-attachments-article').empty().append(attachments);


            // RENDER HTML
            render_article();

            // LOADING BAR
            Pace.restart();
        }
    );
}

function get_list_articles(category, element = undefined, tags = undefined, display) {
    var feed = $('#feed');
    var table = $('.table-article tbody');

    if (typeof category == 'undefined')
        category = element.parent().attr('id');

    if (typeof tags != 'undefined') {
        if (tags == '#')
            tags = element.attr('id');
        else
            tags = element.text();
    }


    $.get(GET_ARTICLES_BY_STATIC_SHORTCUTS,
        {'get_articles_by': category, 'get_articles_by_tags':tags, 'display': display},

        function (data) {
            var html;
            if (typeof (data['msg']) != 'undefined') {
                html = '<div style="width: 588px;font-size:20pt;">' + data['msg'] + '</div>';
            } else {
                html = '';
                for (var key in data) {
                    html += display_function[display](  data[key]['id'],
                                                        data[key]['title'],
                                                        data[key]['desc'],
                                                        data[key]['pub_date'],
                                                        data[key]['loved'],
                                                        data[key]['tags'],
                                                        data[key]['favorites'],
                                                        data[key]['read'],
                                                        data[key]['useful'],
                                                        data[key]['bigup'],
                                                        data[key]['modified'],
                                                        data[key]['views']);
                }

            }

            if(display == 'module') {
                table.empty();
                feed.empty().append(html);
            }
            else {
                feed.empty();
                table.empty().append(html).parent().parent().parent().show();
                $("#grid-data").bootgrid();
                $("table").trigger("update");
            }


            Pace.restart();
            resize_iframe();
        }
    );
}

/********************************************************/
/****************      MISCANELLOUS    ******************/
/********************************************************/

function resize_content(element, relative = undefined) {
    var relative_width;
    var article_width;
    var window_width = $(window).width();
    var menu_width = $('.left-sidebar').width() + 248;

    if (relative != undefined) {
        relative_width = $(relative).width();
        console.log(relative_width);
        article_width = relative_width;
        $(element).css({'width': article_width});
    }
    else {
        article_width = window_width - menu_width;
        $(element).css({'width': article_width});
        $('.content-article p').css({'font-family': '\'EB Garamond\' !important'});
    }
}

function render_article() {
    var article_content = $('.modal-content-article');
    var article = $('.article');

    article_content.find('*').each(function () {
        var element = $(this);
        if(element.width() > element.parent().width()){
            element.css('width', '100%').css('height', 'auto');
        }
    });

    var min_height = $(window).height() - 30;
    article_content.css('min-height', min_height);
    // console.log(article_content.height());
    // article.css('height', article_content.height());

}

function resize_modal(element) {
    var window_width = $(window).width();
    var article_width = window_width - (45 / 100 * window_width);
    $(element).css({'width': article_width});
}

function resize_vertical(element) {
    var header_height = $('header').height();
    var window_height = $(window).height();
    var element_height = window_height - header_height;
    $(element).css({'height': element_height});
}

function resize_iframe() {
    $('.mini-article .content').find('iframe').attr('width', '555px').attr('height', '300px');
    $('.mini-article .content').find('img').css('width', '555px');
}

2
/********************************************************/
/****************         ACTIONS      ******************/
/********************************************************/


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
                selector.parent().find('.' + class_name + '_counter').empty().append(data[class_name + '_counter']);
            });
        }

    });
} //A REFAIRE FONCTION TROP SALE


function read(element, url) {
    var style = element.attr('class');
    var action = 'false';
    var article_id = element.parent().parent().find('.key').text();

    if (style == 'feedback unreaded') {
        element.attr('class', 'feedback readed');
        action = 'true';
    }
    else
        element.attr('class', 'feedback unreaded');


    $.get(url, {'action': action, 'article_id': article_id}, function (data) {});

}


