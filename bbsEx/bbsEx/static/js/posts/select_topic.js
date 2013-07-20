var post;
var li;
$(document).ready(function() {
    $(".question_box").keyup(function() {
        post = $(this).parents(".feed_item");
        postid = post.attr("id");

        $.get("/q_topic/" + $(this).val(), function(data, status) {
            post.find(".results_shell").html(data);
            li = post.find("li").first();
            li.attr("class", "selected_li");
        });
    });

    $(".question_box").blur(function() {
        post = $(this).parents(".feed_item");
        post.find(".results_shell").hide();
    });

    $(".question_box").focus(function() {
        post = $(this).parents(".feed_item");
        post.find(".results_shell").show();
    });

//   $("li").live("mouseover", function() {
//        li.attr("class", false);
//        li = $(this);
//        li.attr("class", "selected_li");
//    });
//    
//    $("li").live("click", function() {
//        var topic_id = li.id;
//            $.get("/select_topic/" + topic_id, function(data, status) {
//                post.find(".results_shell").remove();
//            });
//    });

    $(document).keydown(function(event) {
        // up
        if (event.keyCode == 38) {
            li.attr("class", false);
            li = li.prev();
            li.attr("class", "selected_li");
        }
        // down
        if (event.keyCode == 40) {
            li.attr("class", false);
            li = li.next();
            li.attr("class", "selected_li");
        }
        // enter
        if (event.keyCode == 13) {
            var topic_id = li.attr("id");
            var post_id = post.attr("id");
            $.get("/select_topic/" + post_id + "/" + topic_id, function(data, status) {
                post.find(".results_shell").remove();
            });
        }
    });


});