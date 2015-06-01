Template.postItem.helpers({
	image: function() {
		if (!! this.image) {
			return this.image;
		} else {
			return Session.get('currentCard').image;
		}
	},
	title: function() {
		if (!! this.title) {
			return this.title;
		} else {
			return Session.get('currentCard').title;
		}
	},
	creator: function() {
		if (!! this.creator) {
			return this.creator;
		} else {
			return Session.get('currentCard').creator;
		}
	},
	date: function() {
		if (!! this.date) {
			return this.date;
		} else {
			return Session.get('currentCard').date.toString();
		}
	},
	tags: function() {
		if (!! this.tags) {
			return this.tags;
		} else {
			return Session.get('currentCard').tags;
		}
	},
  	getImage: function(id) {
    	return Images.findOne({_id: id}).url();
  	}
});

Template.postItem.events({
	'click #design_image': function() {
		Session.set('currentCard', this);
	}
});