/**
 * Created by maxbook on 27/04/16.
 */

function mini_article(key, title, author, description, verified_article, date_publish, useful_counter, favorite_counter, tags, favorite) {
    // Verified if article was liked by the current user
    if (favorite == 'ok')
        var color = 'color_liked';
    else
        var color = 'color_base';

    // Verified if article was read by the current user
    if (verified_article == 'ok') {
        img = '<img class="verif" src="http://darkicex3.alwaysdata.net/ibk/secure.png" alt="Verified article" width="12px" style="">'
    } else {
        img = '<img class="un verif" src="http://darkicex3.alwaysdata.net/ibk/unsecure.png" alt="Unverified article" width="12px" style="">'
    }

    // Return an article with title, content, secure, pub_date ...
    return '<div class="shadow_material shadow_material_hover mini-article">' +
        '<span class="key" id="' + key + '" hidden="hidden">' + key + '</span>' +
        '<header>' +
        '<a id="title">' + title + '</a>' +
        '<a id="secure">' + img + '</a>' +
        // '<a id="author">' + author + '</a>' +
        '</header>' +
        '<div class="content"><p>' + content + '</p></div>' +
        '<footer>' +
        '<p id="pub_date"><i class="material-icons md-18 width18 color_base bold">schedule</i>' + date_publish + '</p>' +
        '<p id="note" style="color: #95a5a6"><i class="material-icons md-18 width18 color_base">thumb_up</i>' + useful_counter + '</p>' +
        '<p id="favorite" style="color: #95a5a6;margin-left: 20px;"><i class="favorite material-icons md-18 width18 ' + color + '" style="color:' + color + '">favorite</i>' + favorite_counter + '</p>' +
        '<p style="color: #95a5a6; float: right;"><i class="material-icons md-18 width18 color_base">bookmark</i>' + tags + '</p>' +
        '</footer>' +
        '</div>'
}

function article(key, title, author, content, verified_article, date_publish, useful_counter, favorite_counter, tags, favorite) {

}

function get_articles(category, element) {
    if (typeof category == 'undefined')
        category = element.attr('id');

    $.get(GET_ARTICLES_BY_STATIC_SHORTCUTS,
        {'get_articles_by': category},

        function (data) {
            if (typeof (data['msg']) != 'undefined') {
                var html = '<div style="width: 588px;font-size:20pt;">'+ data['msg'] + '</div>';
            } else {
                var html = '';
                for (var key in data) {
                    html += mini_article(data[key]['id'], data[key]['title'], data[key]['author'], data[key]['desc'],
                        data[key]['ok'], data[key]['pub_date'], data[key]['useful'], data[key]['loved'], data[key]['tags'], data[key]['favorites'])
                }
            }

            $('#feed').empty().append(html);
        }
    );
}

function action_acticle(element) {
        $('body').on('click', element, function (event) {

            selector = $(this).parent().find('.favorite');
            var liked = false;

            if (selector.attr('class') == 'favorite material-icons md-18 width18 color_base') {
                selector.attr('class', 'favorite material-icons md-18 width18 color_liked');
                liked = true;
            } else
                selector.attr('class', 'favorite material-icons md-18 width18 color_base');

            var article_id = $(this).parent().parent().find('.key').attr("id");

            // Si on est dans la categorie Favorites
            // get_articles('Favorites', $(this));

            $.get(SET_FAVORITE, {'liked': liked, 'article_id': article_id}, function (data) {});
        });
}

function show_article(element) {
    var id = element.find('.key').attr('id');

    $.get(show_article, {'article_id': id},
        function (data) {

            for (var key in data) {
                html += mini_article(data[key]['id'], data[key]['title'], data[key]['author'], data[key]['desc'],
                    data[key]['ok'], data[key]['pub_date'], data[key]['useful'], data[key]['loved'], data[key]['tags'], data[key]['favorites'])
            }

            $('#feed').empty().append(html);
        }

    )
}

