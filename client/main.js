if (Meteor.isClient) {

Template["main"].onRendered(function() {
    $('#sidebar').click(function(event) {
        event.preventDefault();
        $('.sidebar').sidebar('toggle');
    });
    $('#upload').click(function(event) {
        $('.ui.modal').modal('toggle');
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
        var fileObj = Images.insert(file);
        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $push:{
                    "profile.design": {
                        "title": title,
                        "image": fileObj._id,
                        "tags": tagStr,
                        "creator": Meteor.user().username,
                        "date": new Date()
                    }
                }
            }
        );
    });
});

// control the show of the main page
Template["main"].onCreated(function() {
    Session.set('currentCard', {}); // for convernient to get card information
});

Template["main"].helpers({
});

Template["main"].events({
    'click #sign_out': function() {
        Meteor.logout(function(err) {
            if (err) {
                alert("error occured when loggingout");
            }
        })
    }
});

}
