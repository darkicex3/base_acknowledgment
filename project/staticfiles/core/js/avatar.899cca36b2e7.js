/**
 * Created by maxbook on 26/04/16.
 */


function change_avatar(data) {

    data.push({name: "csrfmiddlewaretoken", value: getCookie('csrftoken')});

    $.post(CHANGE_AVATAR,
        data,
        function (data) {
            alert(data['image_path']);
            if (data.success) {
                $('#img_profile').css('background-image', 'url(' + data['image_path'] + '\')');
            } else {

            }
        }
    )
}