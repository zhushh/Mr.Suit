ImageCards = new Mongo.Collection('imageCards');

Meteor.methods({
	imageCardInsert: function(imageCard) {
		ImageCards.insert(imageCard);
	}
});