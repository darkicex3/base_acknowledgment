/**
 * Created by maxbook on 27/04/16.
 */



function OnClickShortcutsSetSelected() {
    $('body').on('click', '.widget-menus ul li a', function (e) {
        $('.widget-menus ul li a').removeAttr('style');
        $('.widget-menus ul li a i').removeAttr('style');
        $(this).css({'background-color': '#1C1C25', 'border-left-color': '#A48CD2', 'color': '#FFFFFF !important'});
        $(this).children('i').css('color', '#ffffff !important');
    });
}

function OnMouseEnterMouseLeaveTags() {
    $('body').on({
        mouseenter: function () {
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

function OnAttachment() {
    function rotate(elem, degree) {

        elem.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
        elem.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
        var timer = setTimeout(function() {
            ++degree; rotate();
        },5);
    }

    var button = $('.attachment-button');
    $('body').on({
        mouseenter: function () {
            var elem = $('.attachment-article');
            if (elem.html() != '')
                elem.stop().slideDown(300);
        },
        mouseleave: function () {
            var elem = $('.attachment-article');
            if (elem.html() != '')
                elem.stop().slideUp(300);
        }
    }, '.attachment-section');
}


function OnClickShortcutsShowTrees() {
    $('body').on('mouseover', '.shortcuts-link', function (e) {
        var selector = $(this).parent().children('.children');
        var is_selected = ( $(this).css('background-color') == 'rgb(238, 238, 238)' );

        if (selector.text() != '' && is_selected)
            $(this).parent().children('.children').show(200, function () {
                $(this).empty();
            });
        else {
            get_shortcuts($(this));
        }
        // window.Manager.getListArticle($(this).attr('id'));
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
        var cleaner = $('.clear-search-bar');
        console.log(cleaner.children().first());
        cleaner.children().first().css('color', 'white');
        if (!cleaner.is(":visible")) {
            cleaner.show().transition({width: '50px'});
        }
        $('#search_bar input').attr('placeholder', '').empty().css('background', '#3498db').css('font-size', '17pt').css('color', '#fff !important').val('#' + $(this).text());
        $('#search_categories').empty().css('background', '#3498db');
        $('#search_sorting').css('background', '#3498db').find('.sorting').attr('class', 'sorting material-icons color_white md-36 first-item');
        console.log($(this).attr('id'));
        increment_tag_counter($(this).attr('id').slice(1));
        window.Manager.getListArticle($(this).attr('id'));
    });
}

function OnLoadResizeCsb() {
    var csb_width = $('#search_bar').width() / 2;
    $('.clear-search-bar').css('width', csb_width);
}

function OnSearchBar() {
    var cleaner = $('.clear-search-bar');
    var sc = $('#search_categories');
    $('#search_field').click(function () {
        cleaner = $('.clear-search-bar');
        sc = $('#search_categories');
        if (($(this).val() != '' || sc.css('background-color') == 'rgb(52, 152, 219)') && !cleaner.is(":visible"))
            cleaner.show().transition({width: '50px'});
    }).keyup(function () {
        cleaner = $('.clear-search-bar');
        sc = $('#search_categories');
        console.log('keyup', $(this).val(), cleaner.is(":visible"));
        if ($(this).val() == '' && cleaner.is(":visible")) {
            if (sc.css('background-color') != 'rgb(52, 152, 219)') {
                cleaner.transition({width: '0'}, function () {
                    $(this).hide();
                });
            }
        }
        else if (($(this).val() != '' || sc.css('background-color') == 'rgb(52, 152, 219)') && !cleaner.is(":visible")) {
            cleaner.show().transition({width: '50px'});
        }
    });

    cleaner.click(function () {
        var cat_button = $('#search_categories');
        var cat_content = '<i class="material-icons color_base md-36 first-item">more_horiz</i>';
        var cat_txt = 'more_horiz';
        var sort_button = $('#search_sorting');

        $(this).children().first().css('color', '#5F5F5F');
        console.log(cat_button.text());
        if (cat_button.text() != cat_txt) {
            cat_button.empty().append(cat_content);
            cat_button.css('background', '#fff');
            sort_button.removeAttr('style').find('.sorting').attr('class', 'sorting material-icons color_base md-36 first-item');
        }

        $('#search_field').val('').removeAttr('style').attr('placeholder', 'What are you looking for ?');
        $('.clear-search-bar').transition({width: '0'}, function () {
            $(this).hide();
        });

        window.Manager.getListArticle();
    });
}

function OnClickSearchBarSetEditable() {
    $('body').on('click', '#search_bar input', function (e) {
        var cleaner = $('.clear-search-bar');
        if ($(this).css('background-color') == 'rgb(52, 152, 219)') {
            cleaner.children().first().css('color', '#5F5F5F');
            var value = $(this).val();
            $(this).val('').removeAttr('style');
            $('#search_bar input[name=\'csrfmiddlewaretoken\']').attr('value', getCookie('csrftoken'));
            $('#search_categories').empty().append(value).css({'color': 'white', 'font-size': '12pt'});
            $('#search_sorting').removeAttr('style').find('.sorting').attr('class', 'sorting material-icons color_base md-36 first-item');
            $(this).attr('placeholder', 'What are you looking for ?');
        } else {
            $(this).css('background', '#f3f3f3');
        }
    });
}

function increment_tag_counter(tag_name) {
    $.get(TAGS_COUNTER_INCREMENT, {'in':tag_name}, function (data) {
        console.log(data)
    });
}

function resize_left_menu() {
    var hbar = $('.left-sidebar').height();
    var hman = $('.copyright').height() + 100;
    var hres = hbar - hman;
    $('.menu-left-menu-container').css('height', hres);
}

