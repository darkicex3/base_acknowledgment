/**
 * Created by maxbook on 27/04/16.
 */

function get_shortcuts() {
    $.get(GET_SHORTCUTS,
        function (data) {
            var html = ''
            for (var key in data) {
                html += shortcut(key, data[key]['name'], data[key]['icon']);
            }
            $('.base_menu').empty().append(html);
        }
    );
}

function shortcut(key, name, icon, static_shortcut ) {
    return '<span id="' + key + '" hidden="hidden">' + key + '</span>' + '<li id="' + name + '"class="static_category ui-widget-manager">'+
        '<a class="shortcuts-link"><i class="material-icons md-18 width18 color_base">' + icon + '</i>' + name + '</a></li>'
}
