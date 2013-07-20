var post;
$(function() {
    $(".delete_action").click(function() {
        post = $(this).parents(".feed_item");
        var id = post.attr("id");
        $.get("/del/" + id, function() {
            post.remove();
        });
    });
});