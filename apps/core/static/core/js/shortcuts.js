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
            $('.base_menu').append(html).selectable();
        }
    );
}

function shortcut(key, name, icon) {
    return '<span id="' + key + '" hidden="hidden">' + key + '</span>' + '<li id="' + name + '"class="static_category ui-widget-content">'+
        '<a><i class="material-icons md-24 width24" style="color:#00adef">' + icon + '</i>' + name + '</a></li>'
}
