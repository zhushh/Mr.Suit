Template.postsList.helpers({
  posts: function() {
    var str = Session.get("isSearch");
    if (str == "") {
<<<<<<< HEAD
      return ImageCards.find();
	} else {
	      return ImageCards.find({ '$or' : [{"creator" : str}, {"title" : str}]});
=======
		return ImageCards.find();
	} else {
		return ImageCards.find({ '$or' : [{"creator" : str}, {"title" : str}]});
>>>>>>> zhushh-master
	}
  }
});
Template.postsList.events({
});