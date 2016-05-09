/**
 * Created by maxbook on 27/04/16.
 */


function OnClickShortcutsSetSelected() {
    $('body').on('click', '.widget-menus ul li a', function (e) {
        $('.widget-menus ul li a').removeAttr('style');
        $(this).css('background-color', '#eee');
    });
}

function OnMouseEnterMouseLeaveTags() {
    $('body').on({
        mouseenter: function () {
            console.log(getCookie('csrftoken'));
            if ($('#search_bar input[name=\'csrfmiddlewaretoken\']').attr('value') != getCookie('csrftoken')) {
                var width = ($(this).width() / 2) - 9;
                $(this).find('.add-tags').css({'left': width}).show(100);
            }
        },
        mouseleave: function () {
            $(this).find('.add-tags').hide();
        }
    }, '.bookmarkBadge');
}

function OnClickShortcutsShowTrees() {
    $('body').on('click', '.shortcuts-link', function (e) {
        var selector = $(this).parent().children('.children');
        var is_selected = ( $(this).css('background-color') == 'rgb(238, 238, 238)' );

        if (selector.text() != '' && is_selected)
            $(this).parent().children('.children').slideUp(200, function () {
                $(this).empty();
            });
        else {
            get_shortcuts($(this));
        }
        get_list_articles(undefined, $(this), undefined, window.display_mode);
    });
}

function ActionRightBar(element, section) {
    $('body').on('click', element, function (e) {
        if (section.css('right') == '0px')
            section.css('right', section.width() * (-1));
        else
            section.css('right', '0');
    });
}

function OnClickBookmarkGetArticlesByBookmark() {
    $('body').on('click', '.bookmarkLink', function (e) {
        $('#search_bar input').attr('placeholder', '').empty().css('background', '#3498db').css('font-size', '17pt').css('color', '#fff !important').val('#' + $(this).text());
        $('#search_categories').empty().css('background', '#3498db');
        $('#search_sorting').css('background', '#3498db').find('.sorting').attr('class', 'sorting material-icons color_white md-36 first-item');
        get_list_articles(undefined, $(this), 'tags', window.display_mode);
    });
}

function OnClickSearchBarSetEditable() {
    $('body').on('click', '#search_bar input', function (e) {
        if ($(this).css('background-color') == 'rgb(52, 152, 219)') {

            var value = $(this).val();

            $(this).val('').removeAttr('style');
            $('#search_bar input[name=\'csrfmiddlewaretoken\']').attr('value', getCookie('csrftoken'));
            $('#search_categories').empty().append(value).css({'color': 'white', 'font-size': '12pt'});
            $('#search_sorting').removeAttr('style').find('.sorting').attr('class', 'material-icons color_base md-36 first-item');
            $(this).attr('placeholder', 'What are you looking for ?');
        }
        ;
    });
}

