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

$(function() {
    $(".test_json").click(function() {
    	$.getJSON("/jsonp/", function(json){
    		for(i = 0; i < json.length; i++)
    			alert(json[i].content);
    	});
    });
});