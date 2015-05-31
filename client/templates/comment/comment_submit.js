Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'click .submit': function() {
    $('#submit-form').submit();
  },
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      content: $body.val(),
      image: template.data.image
    };

    var errors = {};
    if (! comment.content) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
        Session.set('commentSubmitErrors', {});   // clear has-error if has.
      }
    });
  }
});