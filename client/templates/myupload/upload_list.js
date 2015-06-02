Template.myupLoad.helpers({
  posts: function() {
    return ImageCards.find({'creator' : Meteor.user().username});
  }
});
Template.myupLoad.events({
}); 
