Template.uploadItem.helpers({
	id: function() {
		return this.image;
	},
  	getImage: function(id) {
    	return Images.findOne({_id: id}).url();
  	},
  	likers_num: function() {
  		return this.likers.length;
  	},
  	liker: function() {
  		var username = Meteor.user().username;
  		for (var i = 0; i < this.likers.length; i++) {
  			if (this.likers[i].name == username) {
  				return true;	// is a liker
  			}
  		}
  		return false;	// not a liker
  	},
  	checkliker: function(liker) {
  		return !liker;
  	}
});
Template.uploadItem.onRendered(function() {
	var item = '.ask-for-design-' + this.data.image;
	var target = '.design-' + this.data.image + '.popup';
	$(item).popup({
		popup: $(target),
		on: 'click',
		inline: false,
	});
});
Template.uploadItem.events({
	'click .agree-ask-for-design': function(event) {
		event.preventDefault();
		var receiver_name = this.creator;
		if (receiver_name != Meteor.user().username) {
			var received_message = {
      			content : "I want to ask you for design. Can you help me?",
      			sender  : Meteor.user().username,
      			receiver: receiver_name,
      			title   : "Ask for design",
      			read    : false  //in order to judge whether the message is readed
			};
			var sent_message = {
      			content : "I want to ask you for design. Can you help me?",
      			sender  : Meteor.user().username,
      			receiver: receiver_name,
      			title   : "Ask for design"
			};

			Meteor.users.update(
				{'_id': Meteor.users.findOne({"username": receiver_name})._id},
				{$push: {"profile.receive": received_message}},
				function(err) {
					if (err) {
						alert("Some error happened during update message");
					}
				}
			);
			Meteor.users.update(
				{'_id': Meteor.user()._id},
				{$push: {"profile.send": sent_message}},
				function(err) {
					if (err) {
						// to-do delete receiver's message
						alert("Some error happened during update message");
					}
				}
			);
		} else {
			alert("This designer is yourself");
		}
		$('.popup').popup('hide');
	},
	'click .cancel-ask-for-design': function(event) {
		event.preventDefault();
		$('.popup').popup('hide');
	},
	'click #remove':function(event) {
		Images.remove({_id: this.image});
		var imageCard = {
          'image': this.image
		};
		Meteor.call('imageCardRemove', imageCard, function(err, result) {
			if (error) {
                throwError(err.reason);
            }
		});
	},
	'click .mark-as-like': function(event) {
		Meteor.call('imageCardIncLikers', this, Meteor.user().username, function(err) {
			if (err) {
				throw Error(err.reason);
			}
		});
	},
	'click .mark-as-unlike': function(event) {
		Meteor.call('imageCardDecLikers', this, Meteor.user().username, function(err) {
			if (err) {
				throw Error(err.reason);
			}
		});
	}
}); 
