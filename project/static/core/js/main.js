jQuery(document).ready(function ($) {

    window.slideSpeed = 200;
    window.sizeSearchBar = $('#colSearchBar').width();

    $(window).resize(function () {
        window.sizeSearchBar = $('#colSearchBar').width();
    });

    // $('.login-url').webuiPopover({
    //     url:'#login_register',
    //     placement: 'bottom-left', animation: 'pop', trigger: 'click', width:300
    // });

    $('#search_categories').webuiPopover({
        type: 'async',
        url: GET_CATEGORIES,
        content: function (data) {
            var html = '<ul>';
            for (var key in data) {
                html += '<li>' + '<span id="key" hidden="hidden">'
                    + key + '</span>' + data[key] + '</li>';
            }
            html += '</ul>';
            return html;
        }, placement: 'bottom-right', animation: 'pop', trigger: 'click', height: 200
    }).click(function () {
        $('#webuiPopover0').css('width', window.sizeSearchBar);
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

    $('#search_field').focus(function () {
        $('.Categories').slideDown(slideSpeed);
    });

    //on .webui-popover-content li click event
    $('body').on('click', '.webui-popover-content li', function (event) {
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
                        // '<img src="https://s-media-cache-ak0.pinimg.com/111x55_sf-76/82/b3/f9/82b3f95c01379be38f1cab0d7cbe89a7.jpg" ' +
                        // 'class="guideImg loaded fade" ' +
                        // 'style="  background-color: #bdaf9c;' +
                        // '"onload="P.lazy.onImageLoad(this)" ' +
                        //  'alt="Search for fruit salad">' +
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

        if (!container.is(e.target) && container.has(e.target).length === 0 && !header.is(e.target) && header.has(e.target).length === 0 && !popover.is(e.target) && popover.has(e.target).length === 0)
            container.slideUp(slideSpeed);
    });

    //DRAG N DROP -- SHORTCUTS -- ARTICLES

    //     var transferred = false;
    // $('.mini-article').draggable({
    //     connectToSortable: '.droppable_bucket',
    //     helper: 'clone',
    //     start: function(event, ui)
    //     {
    //         $(this).hide();
    //     },
    //     stop: function(event, ui)
    //     {
    //         if(!transferred)
    //             $(this).show();
    //         else
    //         {
    //             $(this).remove();
    //             transferred = false;
    //         }
    //     }
    // });


    //AFFICHAGE DES SHORTCUTS
    $.get(GET_SHORTCUTS,
        function (data) {
            var html = ''
            for (var key in data) {
                html += shortcut(key, data[key]['name'], data[key]['icon']);
            }
            $('.base_menu').append(html);
        }
    );


    $.get(GET_ARTICLES_BY_STATIC_SHORTCUTS,
        {'get_articles_by': 'Home'},
        function (data) {
            var html = '';
            for (var key in data) {
                html += mini_article(data[key]['id'], data[key]['title'], data[key]['author'], data[key]['desc'],
                    data[key]['ok'], data[key]['pub_date'], data[key]['useful'], data[key]['loved'], data[key]['tags'], data[key]['favorites'])
            }
            $('#feed').append(html);
        }
    );

    $('body').on('click', '#favorite', function (event) {
        selector = $(this).parent().find('#favorite svg');
        var article_id = $(this).parent().parent().find('.key').attr("id");
        var liked;

        if (selector.css('fill') != 'rgb(255, 0, 0)') {
            selector.css('fill', 'red');
            liked = true;
        } else {
            selector.css('fill', 'black');
            liked = false;
        }
        
        $.get(SET_FAVORITE, {'liked': liked, 'article_id': article_id}, function (data) {
            if (liked)
                selector.webuiPopover({content: 'liked !', placement: 'bottom', animation: 'pop', trigger: 'hover'});
        });
    });

    $('body').on('click', '#note', function (event) {
        alert('cacacacacacuse');
        $.get(

        )
    });

    $('body').on('click', '.static_category', function (event) {
        var category = $(this).attr('id');
        $.get(GET_ARTICLES_BY_STATIC_SHORTCUTS,
            {'get_articles_by': category},
            function (data) {

                var html = '';
                for (var key in data) {
                    html += mini_article(data[key]['id'], data[key]['title'], data[key]['author'], data[key]['desc'],
                        data[key]['ok'], data[key]['pub_date'], data[key]['useful'], data[key]['loved'], data[key]['tags'], data[key]['favorites'])
                }
                $('#feed').empty().append(html);

                for (var key in data) {
                    var id_favorite = '#'+ data[key]['id'];
                    $(id_favorite).parent().find('svg').hide();
                }
            }
        );

    });


    function mini_article(key, title, author, content, verified_article, date_publish, useful_counter, favorite_counter, tags, favorite) {
        // Verified if article was liked by the current user
        if (favorite == 'ok')
            var color = '#00adef';

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
            '<p id="pub_date"><i class="material-icons" style="color:#00adef">schedule</i>' + date_publish + '</p>' +
            '<p id="note" style="color: #95a5a6"><i class="material-icons" style="color:#00adef">thumb_up</i>' + useful_counter + '</p>' +
            '<p id="favorite" style="color: #95a5a6;margin-left: 20px;"><i class="material-icons" style="color:' + color + '">favorite</i>' + favorite_counter + '</p>' +
            '<p style="color: #95a5a6; float: right;"><i class="material-icons" style="color:#00adef">bookmark</i>' + tags + '</p>' +
            '</footer>' +
            '</div>'
    }

    function shortcut(key, name, icon) {
        return '<span id="' + key + '" hidden="hidden">' + key + '</span>' + '<li id="' + name + '"class="static_category"><a><i class="material-icons" style="color:#00adef">' + icon + '</i>' + name + '</a></li>'
    }


});