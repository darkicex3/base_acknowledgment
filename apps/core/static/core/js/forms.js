/**
 * Created by maxbook on 25/03/16.
 */

$('#post-form').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  // sanity check
    create_post();
});

function create_post() {
    console.log("create post is working!") // sanity check
    console.log($('#post-text').val())
};
