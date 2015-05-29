Template.postItem.helpers({
	image: function() {
		if (Session.get('main_page_show')) {
			return this.image;
		} else {
			return Session.get('currentCard').image;
		}
	},
	creator: function() {
		if (Session.get('main_page_show')) {
			return this.creator;
		} else {
			return Session.get('currentCard').creator;
		}
	},
	date: function() {
		if (Session.get('main_page_show')) {
			return this.date.toString();
		} else {
			return Session.get('currentCard').date.toString();
		}
	},
	tags: function() {
		if (Session.get('main_page_show')) {
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
		Session.set('main_page_show', false);
		Session.set('currentCard', this);
	}
});