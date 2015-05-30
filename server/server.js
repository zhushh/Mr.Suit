if (Meteor.isServer) {
  	Meteor.publish("images", function() {
  		return Images.find();
  	});
    Meteor.publish('allUserData', function() {
      if (this.userId) {
        return Meteor.users.find({}, {fields: {username: 1, createdAt: 1, profile: 1, emails: 1}});
      }
    });
}