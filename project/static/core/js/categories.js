/**
 * Created by maxbook on 27/04/16.
 */
jQuery(document).ready(function ($) {

    window.slideSpeed = 200;
    window.sizeSearchBar = $('#colSearchBar').width();

    $(window).resize(function () {
        window.sizeSearchBar = $('#colSearchBar').width();
    });
    $('#search_categories').webuiPopover({
        type: 'async',
        url: GET_CATEGORIES,
        content: function (data) {
            var html = '<ul>';
            for (var key in data) {
                html += '<li class="category">' + '<span id="key" hidden="hidden">'
                    + key + '</span>' + data[key] + '</li>';
            }
            html += '</ul>';
            return html;
        }, placement: 'bottom-right', animation: 'pop', trigger: 'click', height: 200
    }).click(function () {
        $('#webuiPopover0').css('width', window.sizeSearchBar);
    });

    //on .webui-popover-content li click event
    $('body').on('click', '.category', function (event) {
        event.preventDefault();

        //show categories section
        $('.Categories').slideDown(slideSpeed);

        //hide popover
        $('#search_categories').webuiPopover('hide');

        //node_id get children of the parent we click on
        var node_id = $(this).children('span#key').text();

        //get ajax request url : /article/get_categories/ data : {'node_id':node_id}
        $.get(
            //url
            GET_CATEGORIES,
            //dictionnary for the view
            {'node_id': node_id, 'previous': false},
            //function which create a list of categories with parent id = node_id
            function (data) {
                var html = '<ul class="guidesContainer">';
                for (var key in data) {
                    html +=
                        '<li><span id="key" hidden="hidden">' + key + '</span>' +
                        '<a class="guideContainer" ' +
                        'data-image-url="https://s-media-cache-ak0.pinimg.com/111x55_sf-76/82/b3/f9/82b3f95c01379be38f1cab0d7cbe89a7.jpg" ' +
                        'data-term="ideas" ' +
                        'data-term-position="1" ' +
                        'data-dominant-color="#bdaf9c" ' +
                        'data-guide-index="0" ' +
                        'data-element-type="226" ' +
                        'data-aux="" title="">' +
                        '<div class="guideImgMask"><span class="guideText">' + data[key] + '</span></div>' +
                        '</a></li>'
                }
                html += '</ul>';

                $('.guidesSlider').empty().append(html);
            }
        );
    });

    //render the content
    $('.right').click(function () {
        selector = $('.guidesContainer');
        var position = selector.position();
        var r = position.left - $(window).width();
        selector.animate({
            'left': '' + r + 'px'
        });
    });

    $('.left').click(function () {

        selector = $('.guidesContainer');
        var position = selector.position();
        var l = position.left + $(window).width();
        selector.animate({
            'left': '' + l + 'px'
        });
    });

    var selector = $('.guidesContainer');
    //Here we are getting the number of the divs with class contentContainer inside the div container
    var length = selector.children('.guidesContainer li').length;
    //Here we are setting the % width depending on the number of the child divs
    selector.width(length * 100 + '%');

    $(document).mouseup(function (e) {
        var container = $('.Categories');
        var header = $('header');
        var popover = $('.webui-popover-content');
        var search = $('#search_field');
        var results = $('.ac-results');
        var rightmenu = $('.menu-right');
        var cleaner = $('.clear-search-bar');
        var bb = $('.bookmarkBadge');
        var bl = $('.bookmarkLink');
        var sc = $('#search_categories');

        if (!cleaner.is(e.target) && cleaner.has(e.target).length === 0 && !search.is(e.target) && search.has(e.target).length === 0)
            if (sc.css('background-color') != 'rgb(52, 152, 219)') {
                search.css('background', '#fbfcfc');
            }
        if (!rightmenu.is(e.target) && rightmenu.has(e.target).length === 0)
            rightmenu.css('right', rightmenu.width() * (-1));
        if (!search.is(e.target) && search.has(e.target).length === 0)
            $('.cover').hide();
        if (!results.is(e.target) && results.has(e.target).length === 0)
            results.hide();
        if (!container.is(e.target) && container.has(e.target).length === 0 && !header.is(e.target) && header.has(e.target).length === 0 && !popover.is(e.target) && popover.has(e.target).length === 0)
            container.slideUp(slideSpeed);

    });
});