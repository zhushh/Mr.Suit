if (Meteor.isClient) {

Template["main"].onRendered(function() {
    Meteor.startup(function() {
      Tracker.autorun(function() {
        if (Meteor.user()) {
          var receive = Meteor.user()['profile']['receive'];
          var num = 0;
          for (message in receive) {
            if (!message['read'])
              num = num+1;
          }
          if (num > 0) {
            if ($("#cunread").length == 0) {
                var unread = $('<div id = "cunread" class="floating ui label red circular cunread"></div>').text(num.toString());
                $("#message").append(unread);
            } else {
                $("#cunread").text(num.toString());
            }
          } else {
            $("#message").remove(".cunread");
          }
        }
      });
    });
    $('#sidebar').click(function(event) {
        event.preventDefault();
        $('.sidebar').sidebar('toggle');
    });
    $('#upload').click(function(event) {
        $('.ui.modal').modal("toggle");
    });
    $('.ui.checkbox').checkbox();
    $('select.dropdown').dropdown();
    $('.menu .item').tab();
    $(".uploadBt").off();
    $(document).on('click', '.uploadBt', function() {
        var file = $('#file').get(0).files[0];
        var title = $("input[name='img_title']").val();
        var tmps = $('.checked');
        var tags = [];
        for (var i = 0; i < tmps.length; ++i) {
            var tmp = $(tmps[i]).find('label').text();
            tags.push(tmp);
        }
        var tagStr = tags.join(",");
        var fileObj = Images.insert(file, function(err, fileObj) {
            if (err) {
                    alert("storage error");
                    return;
            }
        });
        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $push:{
                    "profile.design": {
                        "title": title,
                        "image": fileObj,
                        "tags": tagStr
                    }
                }
            }
        );
    });
});

Template["main"].helpers({
});

Template["main"].events({
    'click #sign_out': function() {
        Meteor.logout(function(err) {
            if (err) {
                alert("error occured when loggingout");
            }
        });
    }
});
}