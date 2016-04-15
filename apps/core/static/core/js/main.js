jQuery(document).ready(function ($) {

    // window.nbClickRight = "This is global!";
    // window.nbClickRight = "This is global!";
    window.slideSpeed = 200;

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
        }, placement: 'bottom-right', animation: 'pop', trigger: 'click', width:300,height:200
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
        console.log(node_id);

        //get ajax request url : /article/get_categories/ data : {'node_id':node_id}
        $.get(
            //url
            GET_CATEGORIES,
            //dictionnary for the view
            {'node_id':node_id, 'previous': false},
            //function which create a list of categories with parent id = node_id
            function (data) {
                var html = '<ul class="guidesContainer">';
                for (var key in data) {
                    html +=
                        '<li><span id="key" hidden="hidden">' + key + '</span>' +
                        '<a href="#">' +
                            '<div class="guideImgMask"></div>' +
                            '<img src="" class="guideImg loaded fade" style="background-color: #b57328 !important;' +
                                                                    '" onload="P.lazy.onImageLoad(this)"' +
                                 'alt="Search for fruit salad">' +
                            '<span class="guideText">'+ data[key] +'</span>' +
                        '</a></li>'
                }
                html += '</ul>';
                //render the content
                $('.right').click(function () {
                    $('.left').show();
                    selector = $('.guidesContainer');
                    var position = selector.position();
                    var r=position.left-$(window).width();
                    selector.animate({
                        'left': ''+r+'px'
                    });
                });

                $('.left').click(function () {
                    selector = $('.guidesContainer');
                    var position = selector.position();
                    var l=position.left+$(window).width();
                    if(l<=0)
                    {
                        selector.animate({
                            'left': ''+l+'px'
                        });
                    } else if(l>0) {
                        $('.left').hide();
                    }
                });

                selector = $('.guidesContainer');
                //Here we are getting the number of the divs with class contentContainer inside the div container
                var length = selector.children('.guidesContainer li').length;
                //Here we are setting the % width depending on the number of the child divs
                selector.width(length*100 +'%');

                $('.guidesSlider').empty().append(html);
            }
        );
    });


    $(document).mouseup(function (e) {
        var container = $('.Categories');
        var header = $('header');
        var popover = $('.webui-popover-content');

        if (!container.is(e.target) && container.has(e.target).length === 0 &&
            !header.is(e.target) && header.has(e.target).length === 0 &&
            !popover.is(e.target) && popover.has(e.target).length === 0)
            container.slideUp(slideSpeed);
    });

    //Autocomplete

    

});