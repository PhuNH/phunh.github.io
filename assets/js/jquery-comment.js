// Static comments
// from: https://github.com/eduardoboucas/popcorn/blob/gh-pages/js/main.js
(function ($) {
  var $comments = $('.js-comments');

  $('.js-form').submit(function () {
    var form = this;

    $("#comment-form-submit").html(
      '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Sending...'
    );
    $(form).addClass('disabled');
    
    message = $('#comment-form-message')[0].value
    name = $('#comment-form-name')[0].value
    
    if (message === "" || name === "") {
      showModal('Error', 'Please leave a comment and your name.');
      $("#comment-form-submit").html("Submit")
      $(form).removeClass('disabled');
    } else {
      $.ajax({
        type: $(this).attr('method'),
        url:  $(this).attr('action'),
        data: $(this).serialize(),
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          showModal('Comment submitted', 'Thanks! Your comment is <a href="https://github.com/PhuNH/phunh.github.io/pulls">pending</a>. It will appear when approved.');
          $("#comment-form-submit").html("Submit");
          $(form)[0].reset();
          $(form).removeClass('disabled');
        },
        error: function (err) {
          console.log(err);
          var ecode = (err.responseJSON || {}).errorCode || "unknown";
          showModal('Error', 'An error occured.<br>[' + ecode + ']');
          $("#comment-form-submit").html("Submit")
          $(form).removeClass('disabled');
        }
      });
    }
    
    return false;
  });

  $('.js-close-modal').click(function () {
    $('body').removeClass('show-modal');
  });

  function showModal(title, message) {
    $('.js-modal-title').text(title);
    $('.js-modal-text').html(message);
    $('body').addClass('show-modal');
  }
})(jQuery);

// Staticman comment replies, from https://github.com/mmistakes/made-mistakes-jekyll
// modified from Wordpress https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js
// Released under the GNU General Public License - https://wordpress.org/about/gpl/
// addComment.moveForm is called from comment.html when the reply link is clicked.
var addComment = {
  moveForm: function(commId, respondId, parentUid) {
    var div, t  = this,                    // t is the addComment object, with functions moveForm and I, and variable respondId
    comm        = t.I(commId),                                // whole comment
    respond     = t.I(respondId),                             // whole new comment form
    cancel      = t.I('cancel-comment-reply-link'),           // whole reply cancel link
    parentuidF  = t.I('comment-reply-to'),                    // a hidden element in the comment
    commentForm = respond.getElementsByTagName('form')[0];    // the <form> part of the comment_form div

    if (!comm || !respond || !cancel || !parentuidF || !commentForm)
      return;

    t.respondId = respondId;
    
    if (!t.I('sm-temp-form-div')) {
      div = document.createElement('div');
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore(div, respond);  // create and insert a bookmark div right before comment form
    }

    comm.parentNode.insertBefore(respond, comm.nextSibling);  // move the form from the bottom to above the next sibling
    parentuidF.value = parentUid;
    cancel.style.display = '';                        // make the cancel link visible

    cancel.onclick = function() {
      var t       = addComment,
          temp    = t.I('sm-temp-form-div'),          // temp is the original bookmark
          respond = t.I(t.respondId);                 // respond is the comment form

      if (!temp || !respond)
        return;

      t.I('comment-reply-to').value = null;
      temp.parentNode.insertBefore(respond, temp);    // move the comment form to its original location
      temp.parentNode.removeChild(temp);              // remove the bookmark div
      this.style.display = 'none';                    // make the cancel link invisible
      this.onclick = null;                            // retire the onclick handler
      return false;
    };

    // Set initial focus to the first form focusable element.
    for (var i = 0; i < commentForm.elements.length; i++) {
      var element   = commentForm.elements[i],
          cssHidden = false,
          style     = window.getComputedStyle(element);

     /*
      * For display none, do the same thing jQuery does. For visibility,
      * check the element computed style since browsers are already doing
      * the job for us. In fact, the visibility computed style is the actual
      * computed value and already takes into account the element ancestors.
      */
      if ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || style.visibility === 'hidden')
        cssHidden = true;

      // Skip form elements that are hidden or disabled.
      if ('hidden' === element.type || element.disabled || cssHidden)
        continue;

      element.focus();
      break; // Stop after the first focusable element.
    }

    return false;
  },

  I: function(id) {
    return document.getElementById(id);
  }
};
