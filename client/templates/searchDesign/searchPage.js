Template.searchPage.helpers({
  posts: function() {
  	var str = Session.get("isSearch");
  	if (str != "") {
    	return ImageCards.find({ '$or' : [{"creator" : str}, {"title" : str}]});
    } else {
    	return ImageCards.find();
    }
  }
});