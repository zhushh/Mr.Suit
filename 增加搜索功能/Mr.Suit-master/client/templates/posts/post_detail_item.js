Template.postDetailItem.helpers({
	image: function() {
		return this.image;
	},
	title: function() {
		return this.title;
	},
	creator: function() {
		return this.creator;
	},
	date: function() {
		return this.date.toString();
	},
	tags: function() {
		return this.tags;
	},
  	getImage: function(id) {
    	return Images.findOne({_id: id}).url();
  	}
});