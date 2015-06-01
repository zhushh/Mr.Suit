Template.postItem.helpers({
	id: function() {
		return this.image;
	},
  	getImage: function(id) {
    	return Images.findOne({_id: id}).url();
  	}
});
Template.postItem.onRendered(function() {
	var item = '.ask-for-design-' + this.data.image;
	var target = '.design-' + this.data.image + '.popup';
	$(item).popup({
		popup: $(target),
		on: 'click',
		inline: false,
	});
});
Template.postItem.events({
	'click .agree-ask-for-design': function(event) {
		event.preventDefault();

		var receiver = Meteor.users.findOne({'username': this.creator});
		if (!!receiver.username && receiver.username != Meteor.user().username) {
			var received_message = {
      			content : "I want to ask you for design. Can you help me?",
      			sender  : Meteor.user().username,
      			receiver: receiver.username,
      			title   : "Ask for design",
      			read    : false  //in order to judge whether the message is readed
			};
			var sent_message = {
      			content : "I want to ask you for design. Can you help me?",
      			sender  : Meteor.user().username,
      			receiver: receiver.username,
      			title   : "Ask for design"
			};

			Meteor.call(
				'insertReceivedAndSentMessage',
				Meteor.user(),
				receiver,
				sent_message,
				received_message,
				function(err) {
					if (err.error === 'sent_mesg') {
						alert('Failed to send message!');
					} else if (err.error === 'invalid-user') {
						alert('Invalid-user!!!');
					} else if (err.error === 'sender-name') {
						alert("Sender's name diff!!!");
					} else if (err.error === 'receiver-name') {
						alert("receiver's name diff!!!");
					} else if (err.error === 'message-diff') {
						alert("message-diff!!!");
					} else {
						alert("Message send successfully!");
					}
				}
			);
		} else if (!receiver.username) {
			alert("Can't find receiver!");
		} else {
			alert("This designer is yourself");
		}
		$('.popup').popup('hide');
	},
	'click .cancel-ask-for-design': function(event) {
		event.preventDefault();
		$('.popup').popup('hide');
	}
});