/**
 * Created by maxbook on 27/04/16.
 */

function get_shortcuts(element) {

    if (element != undefined)
        var node_id = element.parent().children('span').attr('id');

    $.get(GET_SHORTCUTS,
        {'node_id': node_id, 'previous': 'false'},
        function (data) {
            var html = '';
            for (var key in data) {
                html += shortcut(key, data[key]['name'], data[key]['icon']);
            }
            if (element != undefined)
                element.parent().children('.children')   .empty()
                                            .append(html)
                                            .css('position','relative')
                                            .css('left', '20px')
                                            .slideDown(200);

            else
                $('.base_menu').empty().append(html);
        }
    );
}

function shortcut(key, name, icon) {

    return      '<li id="' + name + '"class="static_category ui-widget-content"><span id="' + key + '" hidden="hidden">' + key + '</span>' +
                    '<a class="shortcuts-link"><i class="material-icons md-18 width18 color_base">' + icon + '</i>' + name + '</a>' +
                    '<div class="children" style="display: none"></div>' +
                '</li>'
}
