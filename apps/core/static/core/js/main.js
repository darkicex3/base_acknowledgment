jQuery(document).ready(function ($) {

    $('#search_categories').webuiPopover({
                        type:'async',
                        url: GET_CATEGORIES,
                        content:function(data){
                            var html = '<ul>';
                            for(var key in data){html+='<li>'+data[key]+'</li>';}
                            html+='</ul>';
                            return html;
                        }, placement:'bottom', animation: 'pop', trigger: 'hover'});

    $('#search_sorting').webuiPopover({
                        type:'async',
                        url: GET_SORTING_METHODS,
                        content:function(data){
                            var html = '<ul>';
                            for(var key in data){html+='<li>'+data[key]+'</li>';}
                            html+='</ul>';
                            return html;
                        }, placement:'bottom', animation: 'pop', trigger: 'hover'});
    
    $('#search_field').click(function () {
        $('header').css('min-height','200px')
    });

    $(document).mouseup(function (e)
    {
        var container = $('header');

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.css('min-height','80px');
        }
    });

});