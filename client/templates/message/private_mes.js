/*Template.messend.events({
  'submit form':function(e) {
    e.preventDefault();


    
    var receiver_name = $(e.target).find('[name=receiver]').val();
    var receiver = Meteor.users.findOne({"username":receiver_name});
    var sender = Meteor.user();
    var sender_name = sender["username"];

    //create new data
    var sent_message = {
      content : $(e.target).find('[name=mesT]').val(),
      sender  : sender_name,
      receiver: receiver_name,
      title   : $(e.target).find('[name=mesT]').val()
    };


    //create new data
    var received_message = {
      content : $(e.target).find('[name=mesT]').val(),
      sender  : sender_name,
      receiver: receiver_name,
      title   : $(e.target).find('[name=mesT]').val(),
      read    : false  //in order to judge whether the message is readed
    };


    if (receiver == undefined) {
      alert("Receiver is not exist")
    } else if (sender == undefined) {
      alert("Sender is not defined")
    } else {

      var receiver_id = receiver["_id"];


      //insert the message into the database
      Meteor.users.update(
        {"_id":receiver_id},
        {$push:{"profile.receive":received_message}},function(err) {

          if (err) {
            alert("Some error happened during update");
          }
        }
        );

      //insert the message into the database
      Meteor.users.update(
        {"_id":Meteor.user()['_id']},
        {$push:{"profile.send":sent_message}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
        );
    }
  }
});*/