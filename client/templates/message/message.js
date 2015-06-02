Meteor.subscribe('message');

Template["mesget"].helpers({
	mesnum:function() {
		return 3;
	}
});
Template["Mrsuit"].helpers({
	mesnum:function() {
		return 3;
	}
});

Template['mesmain'].helpers({
	mesT: function () {
      var date = new Date();
      var mes = [];
      var mesT = [];
      console.log(Meteor.user()["username"]);
      var messages = Messages.findOne({"username":Meteor.user()["username"]});
      var received_messages = messages["receive"];
      var sent_messages = messages["send"];

  	  for (var mesa in received_messages) {

        //get the messages from mesa
        for (var i in received_messages[mesa]) {
          var message = received_messages[mesa][i]
          var temp = {'mesContent':message["content"], 'mesDate':message['time'], 'poster':message['sender'], owner:false};
          mes.push(temp);
        }


        //get the messages from the current user
        for (var i in sent_messages[mesa]) {
          var message = sent_messages[mesa][i]
          var temp = {'mesContent':message["content"], 'mesDate':message['time'], 'poster':message['sender'], owner:true};
          mes.push(temp);
        }


        mesT.push({'mes':mes, 'title':mesa});
      }
      return mesT;
    },
    recentReceivers: function () {
    	return [{'name':'张三'},{'name':'李四'},{'name':'王二'}];
    }
});
Template['mesmain'].events({
	'mouseenter .mes': function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}
		t.style.backgroundColor='rgb(210,215,221)';
	},
	'mouseleave .mes': function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}
		t.style.backgroundColor='rgb(247,247,247)';
	},
	'click .ellipsis.horizontal.icon': function(e) {
		var t = e.target;
		t.className='angle up icon';
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='contents') {i++;}
		t[i].style.display='block';
	},
	'click .angle.up.icon':function(e) {
		var t = e.target;
		t.className='ellipsis horizontal icon';
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='contents') {i++;}
		t[i].style.display='none';
	},
	'click .outline.chat.icon':function(e) {
		var t = e.target;
		t = t.parentNode.parentNode;
		t = t.children;
		var i=0;
		while(t[i].className !='reply') {i++;}
		if (t[i].style.display != ''){ 
			t[i].style.display='';
		} else {
			t[i].style.display='block';
		}
	},
	'click .trash.icon':function(e) {
		var t = e.target;
		while(t.className != 'mes'){
			t = t.parentNode;	
		}

    var target = e.target.attr("title");
    

		var p = t.parentNode;
		p.removeChild(t);
	},
	'mouseenter .namelist':function(e) {
		e.target.style.backgroundColor = 'beige';
	},
	'mouseleave .namelist':function(e) {
		e.target.style.backgroundColor = 'rgb(247,247,247)';
	},
	'click .namelist':function(e) {
		var receiver = document.getElementById('receiver');
		var name = e.target;
		name = name.innerText;
		receiver.value = name;
	},

	'submit #send':function(e) {
    e.preventDefault();

    var date = Date();
    
    var receiver_name = $(e.target).find('[name=receiver]').val();
    var receiver = Messages.findOne({"username":receiver_name});
    var sender_name = Meteor.user()["username"];
    var sender = Messages.findOne({"username":sender_name});
    var sender_id = sender["_id"];
    var receiver_id = receiver["_id"];

    //create new data
    var sent_message = {
      "content" : $(e.target).find('[name=content]').val(),
      "sender"  : sender_name,
      "receiver": receiver_name,
      "title"   : $(e.target).find('[name=title]').val(),
      "time"    : date
    };


    //create new data
    var received_message = {
      "content" : $(e.target).find('[name=content]').val(),
      "sender"  : sender_name,
      "receiver": receiver_name,
      "title"   : $(e.target).find('[name=title]').val(),
      "time"    : date,
      "read"    : false  //in order to judge whether the message is readed
    };


    if (receiver == undefined) {
      alert("Receiver is not exist")
    } else if (sender == undefined) {
      alert("Sender is not defined")
    } else {
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
    }
  },
  'submit #reply': function(e) {
    e.preventDefault();

    var date = Date();
    
    var receiver_name = $(e.target).find('[name=content]').attr("title");
    console.log(receiver_name);
    var receiver = Messages.findOne({"username":receiver_name});
    var sender_name = Meteor.user()["username"];
    var sender = Messages.findOne({"username":sender_name});
    

    //create new data
    var sent_message = {
      "content" : $(e.target).find('[name=content]').val(),
      "sender"  : sender_name,
      "receiver": receiver_name,
      "title"   : "reply",
      "time"    : date
    };


    //create new data
    var received_message = {
      "content" : $(e.target).find('[name=content]').val(),
      "sender"  : sender_name,
      "receiver": receiver_name,
      "title"   : "reply",
      "time"    : date,
      "read"    : false  //in order to judge whether the message is readed
    };


    if (receiver == undefined) {
      alert("Receiver is not exist")
    } else if (sender == undefined) {
      alert("Sender is not defined")
    } else {
      var sender_id = sender["_id"];
      var receiver_id = receiver["_id"];

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
    }
  }

});

