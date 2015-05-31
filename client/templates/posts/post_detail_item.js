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

Template.postDetailItem.onRendered(function() {
	$('#post-detail-design-image').click(function(event) {
		event.preventDefault();
		$('.ui.big-image.modal').modal('show');
	});
});

Template.postDetailItem.events({
});