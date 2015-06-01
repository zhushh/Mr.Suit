ImageCards = new Mongo.Collection('imageCards');

Meteor.methods({
	imageCardInsert: function(imageCard) {
		return ImageCards.insert(imageCard);
	},
	imageCardRemove: function(imageCard) {
        return ImageCards.remove(imageCard);
	}
});