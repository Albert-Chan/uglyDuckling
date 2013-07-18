var post;
$(document).ready(function(){
  $(".question_box").keyup(function(){
   post = $(this).parents(".feed_item");
   postid = post.attr("id");

  	$.get("/q_topic/"+ $(this).val(),
  		function(data,status){
      		post.find("#results_shell").html(data);
  		});
  	
  });
  $(".question_box").blur(function(){
   post = $(this).parents(".feed_item");
   post.find("#results_shell").hide();
  });
  $(".question_box").focus(function(){
   post = $(this).parents(".feed_item");
   post.find("#results_shell").show();
  });

});