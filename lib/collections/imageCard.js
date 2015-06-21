ImageCards = new Mongo.Collection('imageCards');

Meteor.methods({
	imageCardInsert: function(imageCard) {
		check(imageCard, {
			title: String,
			image: String,
			tags: String,
			creator: String,
			creatorId: String,
			date: Date,
			likers: Array
		});
		return ImageCards.insert(imageCard);
	},
	imageCardRemove: function(imageCard) {
		check(imageCard, {
			image: String
		});
        return ImageCards.remove(imageCard);
	},
	imageCardIncLikers: function(imageCard, username) {
		check(username, String);
		check(imageCard, {
			_id: String,
			title: String,
			image: String,
			tags: String,
			creator: String,
			creatorId: String,
			date: Date,
			likers: Array
		});
		for (var i = 0; i < imageCard.likers.length; i++) {
			if (imageCard.likers[i].name == username) {
				return true;	// find the user whether exits in the liker array
			}
		}
		ImageCards.update(
			{_id: imageCard._id},
			{$push: {
				"likers": {name: username}
			}}
		);
	},
	imageCardDecLikers: function(imageCard, username) {
		check(username, String);
		check(imageCard, {
			_id: String,
			title: String,
			image: String,
			tags: String,
			creator: String,
			creatorId: String,
			date: Date,
			likers: Array
		});
		ImageCards.update(
			{_id: imageCard._id},
			{$pull: {
				"likers": {name: username}
			}}
		);
	}
});