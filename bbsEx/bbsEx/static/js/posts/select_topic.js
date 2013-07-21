var post;
var li;
$(document).ready(function() {
    $(".question_box").keyup(function() {
        post = $(this).parents(".feed_item");
        postid = post.attr("id");

        // up
        if (event.keyCode == 38) {
            if (li.prev().length == 0) {
                return;
            }
            li.removeAttr("class");
            li = li.prev();
            li.attr("class", "selected_li");
        }
        // down
        else if (event.keyCode == 40) {
            if (li.next().length == 0) {
                return;
            }
            li.removeAttr("class");
            li = li.next();
            li.attr("class", "selected_li");
        }
        // enter
        else if (event.keyCode == 13) {
            var topic_id = li.attr("id");
            var post_id = post.attr("id");
            var topic_a = $(this).parents(".topics").find("#topic_a");
            if (topic_id == "new_topic") {
                topic_a.text($(this).val());
                $.post("/add_topic/", {
                    post_id: post_id,
                    topic_name: $(this).val()
                }, function(data, status) {});
            } else {
                topic_a.text(li.text());
                $.get("/select_topic/" + post_id + "/" + topic_id, function(data, status) {});
            }
            post.find(".results_frame").remove();
            $(this).val("");
        } else {
            // other key press... TODO: remove control characters.
            $.get("/q_topic/" + $(this).val(), function(data, status) {
                post.find(".results_shell").html(data);
                li = post.find("li").first();
                li.attr("class", "selected_li");
            });
        }
    });

   // $(".question_box").blur(function() {
//        post = $(this).parents(".feed_item");
//        post.find(".results_shell").hide();
//    });

    $(".question_box").focus(function() {
        post = $(this).parents(".feed_item");
        post.find(".results_shell").show();
    });

    $(document).on("mouseover", "li", function() {
        li.removeAttr("class");
        li = $(this);
        li.attr("class", "selected_li");
    });

    $(document).on("click", "li", function() {
        var topic_id = li.attr("id");
        var post_id = post.attr("id");
        var topic_a = $(this).parents(".topics").find("#topic_a");
        if (topic_id == "new_topic") {
            topic_a.text($(this).text());
            $.post("/add_topic/", {
                post_id: post_id,
                topic_name: $(this).text()
            }, function(data, status) {});
        } else {
            topic_a.text(li.text());
            $.get("/select_topic/" + post_id + "/" + topic_id, function(data, status) {});
        }
        post.find(".results_frame").remove();
        post.find(".question_box").val("");
    });
});