Template.postsList.helpers({
  posts: function() {
    var str = Session.get("isSearch");
    if (str == "") {
      return Meteor.users.find({"profile.design": {$exists: true}});
} else {
      return Meteor.users.find({ '$or' : [{"profile.design.creator" : str}, {"profile.design.title" : str}]});
}
  }
});