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
            if (data['msg'] != undefined){
                $('.base_menu').empty().append(data['msg']);
            }
            else if (element != undefined) {
                element.parent().children('.children')   .empty()
                                            .append(html)
                                            .show(200);
            }
            else {
                $('.base_menu').empty().append(html);
                $('#Home .shortcuts-link').css({'background-color': '#1C1C25', 'color': '#FFFFFF !important'}).children('i').css('color', '#ffffff !important');;

            }
        }
    );
}

function shortcut(key, name, icon) {

    return      '<li id="' + name + '"class="static_category ui-widget-content"><span id="' + key + '" hidden="hidden">' + key + '</span>' +
                    '<a id="'+ name +'" class="shortcuts-link"><i class="material-icons md-18 width18 link_menu_color">' + icon + '</i>' + name + '</a>' +
                    '<div class="children" style="display: none"></div>' +
                '</li>'
}
