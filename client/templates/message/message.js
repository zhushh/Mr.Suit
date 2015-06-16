Meteor.subscribe('message');

Template["mesget"].helpers({
  mesnum:function() {

    var count = 0;

        var messages = Messages.findOne({"username":Meteor.user()["username"]});
        var received_messages = messages["receive"];
        var contactors = messages["recent"];  //contactor means all the contactors

        for (var j = contactors.length -1 ; j >= 0; --j) {
          var mesa = contactors[j];
          for (var i in received_messages[mesa]) {
            var message = received_messages[mesa][i]
            if (message["read"] == false)
              count++;
          }
        }


    console.log(count);
    if (count == 0)
      $(".messpan").hide();
    return count;
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
      var messages = Messages.findOne({"username":Meteor.user()["username"]});
      var received_messages = messages["receive"];
      var sent_messages = messages["send"];
      var contactors = messages["recent"];  //contactor means all the contactors

      for (var j = contactors.length -1 ; j >= 0; --j) {
        var mesa = contactors[j];
        mes = []

        for (var i in received_messages[mesa]) {
          var message = received_messages[mesa][i]
          var temp = {'mesContent':message["content"], 'mesDate':message['time'], 'poster':message['sender'], owner:false};
          mes.push(temp);
        }

        for (var i in sent_messages[mesa]) {
          var message = sent_messages[mesa][i]
          var temp = {'mesContent':message["content"], 'mesDate':message['time'], 'poster':message['sender'], owner:true};
          mes.push(temp);
        }

        function sortDate (a, b) {
            return a.mesDate < b.mesDate ? -1 : 1;
            console.log("ok");
        }
        mes.sort(sortDate);
        
        mesT.push({'mes':mes, 'title':mesa});

      }

      return mesT;
    },
    recentReceivers: function () {
      var messages = Messages.findOne({"username":Meteor.user()["username"]});
      var contactors = messages["recent"];
      var three = [];
      var counter = 0;
      for (var i = contactors.length-1; i >=0; --i) {
        three.push({'name':contactors[i]});
        counter++;
        if (counter >= 3)
          break;
      }
      return three;
      //return [{'name':'张三'},{'name':'李四'},{'name':'王二'}];
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
    var name = $(e.target).attr("name");

    var messages = Messages.findOne({"username":Meteor.user()["username"]});
    var received_messages = messages["receive"];
    var user_id = messages["_id"];
    var contactors = messages["recent"];

    console.log(name);


    for (var j = contactors.length -1 ; j >= 0; --j) {
      var mesa = contactors[j];
      console.log(mesa);
      if (mesa == name) {
        for (var i in received_messages[mesa]) {
          received_messages[mesa][i]["read"] = true;
        }
        break;
      }
    }

    Messages.update(
        {"_id":user_id},
        {$set:{"receive":received_messages}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
    });


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
    while(t[i].className !='message-reply') {i++;}
    if (t[i].style.display != ''){ 
      t[i].style.display='';
    } else {
      t[i].style.display='block';
    }
  },
  'click .trash.icon':function(e) {
    var t = e.target;

    e.preventDefault();

    var date = Date();
    
    var target_name = $(e.target).attr("title");
    console.log(target_name);
    var my_name = Meteor.user()["username"];
    var me = Messages.findOne({"username":my_name});
    var my_recent = me["recent"];      //the recent contactor of sender


    if (target_name == undefined) {
      alert("Target is not exist");
    } else if (my_name == undefined) {
      alert("You do not have permission to delete");
    } else {
      var my_id = me["_id"];

      for (var i in my_recent) {
        if (my_recent[i] == target_name) {
          my_recent.splice(i, 1);
          break
        }
      }

      received_messages = me["receive"];
      send_messages = me["send"];

      received_messages[target_name] = undefined;
      send_messages[target_name] = undefined;

    //insert the message into the database
      Messages.update(
        {"_id":my_id},
        {$set:{"send":send_messages, "recent":my_recent, "receive" : received_messages}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
      );    
    }


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
  'click #history':function(e) {
    $("#history").addClass("active");
    $('#send').removeClass('active');
    $("#send_tab").removeClass("active");
    $("#history_tab").addClass("active");
  },
  'click #send':function(e) {
    $("#history").removeClass("active");
    $('#send').addClass('active');
    $("#send_tab").addClass("active");
    $("#history_tab").removeClass("active");
  },

  'submit #send_form':function(e) {
    e.preventDefault();

    var date = Date();
    
    var receiver_name = $(e.target).find('[name=receiver]').val();
    var receiver = Messages.findOne({"username":receiver_name});
    var sender_name = Meteor.user()["username"];
    var sender = Messages.findOne({"username":sender_name});
    var sender_id = sender["_id"];
    var receiver_id = receiver["_id"];
    var receiver_recent = receiver["recent"];  //the recent contactor of receiver
    var sender_recent = sender["recent"];      //the recent contactor of sender

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
    } else if (sender_name == receiver_name) {
      alert("You could not send message to yourself");
    } else {
      var received_messages = receiver["receive"];
      var send_messages = sender["send"];

      if (received_messages[sender_name] == undefined) {
        received_messages[sender_name] = [];
      }

      if (send_messages[receiver_name] == undefined) {
        send_messages[receiver_name] = [];
      }


      for (var i in receiver_recent) {
        if (receiver_recent[i] == sender_name) {
          receiver_recent.splice(i, 1);
          break
        }
      }
      receiver_recent.push(sender_name);

      for (var i in sender_recent) {
        if (sender_recent[i] == receiver_name) {
          sender_recent.splice(i, 1);
          break
        }
      }
      sender_recent.push(receiver_name);


      received_messages[sender_name].push(received_message);
      send_messages[receiver_name].push(sent_message);

      Messages.update(
        {"_id":receiver_id},
        {$set:{"receive":received_messages, "recent":receiver_recent}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
      );

    //insert the message into the database
      Messages.update(
        {"_id":sender_id},
        {$set:{"send":send_messages, "recent":sender_recent}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
      );
      $("#history").addClass("active");
      $('#send').removeClass('active');
      $("#send_tab").removeClass("active");
      $("#history_tab").addClass("active");
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
    var receiver_recent = receiver["recent"];  //the recent contactor of receiver
    var sender_recent = sender["recent"];      //the recent contactor of sender
    

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
    } else if (sender_name == receiver_name) {
      alert("Sorry, you could not send message to yourself");
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

      for (var i in receiver_recent) {
        if (receiver_recent[i] == sender_name) {
          receiver_recent.splice(i, 1);
          break
        }
      }
      receiver_recent.push(sender_name);

      for (var i in sender_recent) {
        if (sender_recent[i] == receiver_name) {
          sender_recent.splice(i, 1);
          break
        }
      }
      sender_recent.push(receiver_name);

      received_messages[sender_name].push(received_message);
      send_messages[receiver_name].push(sent_message);

      Messages.update(
        {"_id":receiver_id},
        {$set:{"receive":received_messages, "recent":receiver_recent}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
      );

    //insert the message into the database
      Messages.update(
        {"_id":sender_id},
        {$set:{"send":send_messages, "recent":sender_recent}},function(err) {
          if (err) {
            alert("Some error happened during update");
          }
        }
      );    
      $(".message-reply").hide();
      $(".content").hide();
    }

  }

});
