Template.postPage.helpers({
  	comments: function() {
    	return Comments.find({image: this.image});
  	}
});
