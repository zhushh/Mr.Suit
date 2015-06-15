if (Meteor.isServer) {
  	Meteor.publish("images", function() {
  		return Images.find();
  	});
    Meteor.publish('imageCards', function() {
      return ImageCards.find();
    });
	  Meteor.publish('comments', function() {
	    return Comments.find();
	  });
    Meteor.publish('allUserData', function() {
        if (this.userId) {
            return Meteor.users.find({}, {fields: {username: 1, createdAt: 1, profile: 1, emails: 1}});
        }
    });
     Meteor.publish('message', function() {
      return Messages.find();
    });
}