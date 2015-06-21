Template.postItem.helpers({
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
                return true;    // is a liker
            }
        }
        return false;   // not a liker
    },
    checkliker: function(liker) {
        return !liker;
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

        var date = Date();
        var receiver_name = this.creator;
        var receiver = Messages.findOne({"username":receiver_name});
        var sender_name = Meteor.user()["username"];
        var sender = Messages.findOne({"username":sender_name});
        var sender_id = sender["_id"];
        var receiver_id = receiver["_id"];
        if (!!receiver.username && receiver.username != Meteor.user().username) {
            var received_message = {
                content : "I want to ask you for design. Can you help me?",
                sender  : Meteor.user().username,
                receiver: receiver.username,
                title   : "Ask for design",
                time    : date,
                read    : false  //in order to judge whether the message is readed
            };
            var sent_message = {
                content : "I want to ask you for design. Can you help me?",
                sender  : Meteor.user().username,
                receiver: receiver.username,
                time    : date,
                title   : "Ask for design"
            };

            var received_messages = receiver["receive"];
            var send_messages = sender["send"];

            if (received_messages[sender_name] == undefined) {
                received_messages[sender_name] = [];
            }

            if (send_messages[receiver_name] == undefined) {
                send_messages[receiver_name] = [];
            } 

            received_messages[sender_name].push(received_message);
            send_messages[receiver_name].push(sent_message);

            Messages.update(
                {"_id":receiver_id},
                {$set:{"receive":received_messages}},function(err) {
                    if (err) {
                        alert("Some error happened during update");
                    }
                }
            );

            //insert the message into the database
            Messages.update(
                {"_id":sender_id},
                {$set:{"send":send_messages}},function(err) {
                    if (err) {
                        alert("Some error happened during update");
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
    },
    'click .mark-as-like': function(event) {
        Meteor.call('imageCardIncLikers', this, Meteor.user().username, function(err) {
            if (err) {
                throw Error(err.reason);
            } else {

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