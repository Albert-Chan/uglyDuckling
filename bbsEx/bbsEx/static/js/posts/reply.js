var current_reply;
$(document).ready(function() {
	newReply = $(".replyForm").find(".new_reply");
    newReply.hide();
      $(".show_reply").click(function() {
          reply = $(this).parents(".reply");
          reply_id = reply.attr("id");
          newReply = reply.find(".new_reply");
          if(current_reply == reply_id) {
        	  newReply.hide();
        	  current_reply = null;
          } else{
        	  newReply.show();
        	  newReply.find('input[name=reply_id]').val(reply_id);
        	  current_reply = reply_id;
          }
      });
  });