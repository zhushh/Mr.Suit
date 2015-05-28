Template.postsList.helpers({
  posts: function() {
    return Meteor.users.find({"profile.design": {$exists: true}});
  }
});