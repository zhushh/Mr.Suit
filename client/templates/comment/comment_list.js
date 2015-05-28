Template.commentList.helpers({
  commentLists: function(id) {	// get comments whose cardID equals to id.
    return Meteor.comments.find({cardID: id});
  }
});