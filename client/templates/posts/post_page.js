Template.postPage.helpers({
  	comments: function() {
    	return Comments.find({image: Session.get('currentCard').image});
  	}
});