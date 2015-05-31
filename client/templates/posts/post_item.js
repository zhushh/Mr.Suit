Template.postItem.helpers({
	id: function() {
		return this.image;
	},
  	getImage: function(id) {
    	return Images.findOne({_id: id}).url();
  	}
});

Template.postItem.events({
});