Template.myLike.helpers({
  posts: function() {
		return ImageCards.find({'likers': {name: Meteor.user().username}});
  }
});
Template.myLike.events({
});