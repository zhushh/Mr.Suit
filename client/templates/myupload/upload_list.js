Template.myupLoad.helpers({
  posts: function() {
    // return ImageCards.find({'creator' : Meteor.user().username});
    var str = Session.get("isSearch");
    if (str == "") {
		return ImageCards.find({'creator' : Meteor.user().username});
	} else {
		return ImageCards.find({ '$or' : [{"creator" : str}, {"title" : str}]});
	}
  }
});
Template.myupLoad.events({
}); 
