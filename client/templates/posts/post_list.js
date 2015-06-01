Template.postsList.helpers({
  posts: function() {
    var str = Session.get("isSearch");
    if (str == "") {
      return ImageCards.find();
} else {
      return ImageCards.find({ '$or' : [{"creator" : str}, {"title" : str}]});
}
  }
});
Template.postsList.events({
});