  var post;
  var show = false;
  $(document).ready(function() {
      $(".comment").click(function() {
          post = $(this).parents(".feed_item");
          var id = post.attr("id");
          var post_container = post.find(".comment_container")
          if (!show) {
              $.get("/comment/" + id, function(data, status) {
                  post_container.show();
                  post_container.html(data);
                  show = true;
              });
          } else {
              post_container.hide();
              show = false;
          }
      });
  });