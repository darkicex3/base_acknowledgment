jQuery(document).ready(function ($) {

    $('#search_categories').webuiPopover({
        type: 'async',
        url: GET_CATEGORIES + '0',
        content: function (data) {
            var html = '<ul>';
            for (var key in data) {
                html += '<li>' + '<span id="key" hidden="hidden">'
                    + key + '</span>' + data[key] + '</li>';
            }
            html += '</ul>';
            return html;
        }, placement: 'bottom', animation: 'pop', trigger: 'click'
    });

    $('#search_sorting').webuiPopover({
        type: 'async',
        url: GET_SORTING_METHODS,
        content: function (data) {
            var html = '<ul>';
            for (var key in data) {
                html += '<li>' + data[key] + '</li>';
            }
            html += '</ul>';
            return html;
        }, placement: 'bottom', animation: 'pop', trigger: 'hover'
    });

    $('#search_field').click(function () {
        $('header').css('min-height', '200px')
    });

    $('body').on('click', '.webui-popover-content li', function (event) {
        event.preventDefault();
        $('header').css('min-height', '200px');
        $('#search_categories').webuiPopover('hide');

        var node_id = $(this).children('span#key').text();
        console.log(node_id);

        $.get(GET_CATEGORIES + node_id,
            function (data) {
                var html = '<ul>';
                for (var key in data) {
                    html += '<li>' + '<span id="key" hidden="hidden">'
                        + key + '</span>' + data[key] + '</li>';
                }
                html += '</ul>';
                $('header #sub_categories').append(html);
            }
        );
    });


    $(document).mouseup(function (e) {
        var container = $('header');
        var popover = $('.webui-popover-content');

        if (!container.is(e.target) && container.has(e.target).length === 0)
            container.css('min-height', '80px');
    });

});