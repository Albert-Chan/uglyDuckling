!function(window, $, infinity, Post) {
  var _ = require('underscore'),
      modal = require('o2-modal'),
      PostStorage = Post.storage;

  var spinnerTemplate = _.template($('#spinner-template').html());

  infinity.config.PAGE_TO_SCREEN_RATIO = 3;
  infinity.config.SCROLL_THROTTLE = 200;

  !function() {
    var spinner = $(spinnerTemplate());
    var updateScheduled = false;
    function onscreen($el) {
      var viewportBottom = $(window).scrollTop() + $(window).height();
      return $el.offset().top <= viewportBottom;
    }
    spinner.insertAfter($('#demo').closest('.row'));
    $(window).on('scroll', function() {
      if(!updateScheduled) {
        setTimeout(function() {
          if(onscreen(spinner)) Post.bomb(100);
          updateScheduled = false;
        }, 500);
        updateScheduled = true;
      }
    });
  }();


  Post.bomb(400);
}(window, jQuery, infinity, Post);