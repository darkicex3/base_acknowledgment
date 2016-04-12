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
    
    $('#search_field').onclick(function () {
        
    })
});