Messages = new Mongo.Collection("message");
Messages.allow({
  update : function() {return true},
  insert : function() {return true}
});

Meteor.methods({
	insertReceivedAndSentMessage: function(sender, receiver, sent_mesg, received_mesg) {
		if (Meteor.user().username != sender.username) {
			throw new Meteor.Error('invalid-user', "Can't find sender");
		}
		if (! Meteor.users.findOne({'username': receiver.username})) {
			throw new Meteor.Error('invalid-user', "Can't find receiver");
		}

		// check type
		check(sent_mesg, {
			content : String,
			sender  : String,
			receiver: String,
			title   : String
		});
		check(received_mesg, {
			content : String,
			sender  : String,
			receiver: String,
			title   : String,
			read 	: Boolean
		});
		// check message
		if (sender.username != sent_mesg.sender 
			|| sender.username != received_mesg.sender) {
			throw new Meteor.Error('sender-name', "sender's name is wrong!");
		}
		if (receiver.username != sent_mesg.receiver 
			|| receiver.username != received_mesg.receiver) {
			throw new Meteor.Error('receiver-name', "receiver's name is wrong!");
		}
		if (sent_mesg.sender != received_mesg.sender) {
			throw new Meteor.Error('message-diff', "message's sender is different!");
		}
		if (sent_mesg.receiver != received_mesg.receiver) {
			throw new Meteor.Error('message-diff', "message's receiver is different!");
		}
		if (sent_mesg.title != received_mesg.title) {
			throw new Meteor.Error('message-diff', "message's title is different!");
		}
		if (sent_mesg.content != received_mesg.content) {
			throw new Meteor.Error('message-diff', "message's content is different!");
		}
		Meteor.users.update(
			{"_id": Meteor.user()._id},
			{$push: {"profile.send": sent_mesg}},
			function(err) {
				if (err) {
					throw new Meteor.Error('sent_mesg', "Send message failed!");
				} else {	// sender info update successfully, update receiver
					Meteor.users.update(
						{"_id": receiver._id},
						{$push: {"profile.receive": received_mesg}},
						function(err) {
							if (err) {
								// to-do, delete the sender's message
								throw new Meteor.Error('sent_mesg', "Send message failed!");
							}
						}
					);
				}
			}
		);
	}
});