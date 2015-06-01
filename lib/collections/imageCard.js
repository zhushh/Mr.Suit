ImageCards = new Mongo.Collection('imageCards');

Meteor.methods({
	imageCardInsert: function(imageCard) {
		return ImageCards.insert(imageCard);
	}
});