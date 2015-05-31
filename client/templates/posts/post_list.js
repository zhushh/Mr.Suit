Template.postsList.helpers({
  posts: function() {
    return ImageCards.find();
  }
});