if (Meteor.isClient) {

Template["main"].onRendered(function() {
    console.log("tetytyu");
    $('#sidebar').click(function(event) {
        event.preventDefault();
        $('.sidebar').sidebar('toggle');
    });
    $('#upload').click(function(event) {
        event.preventDefault();
        $('#upload-modal').modal('toggle');
    });
    $('.ui.checkbox').checkbox();
    $('select.dropdown').dropdown();
    $('.menu .item').tab();
    $('.uploadBt').off();
    $('.uploadBt').on('click', function() {
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
        var currentDate = new Date();
        Meteor.users.update(
            {_id: Meteor.userId()},
            {
                $push:{
                    "profile.design": {
                        "title": title,
                        "image": fileObj._id,
                        "tags": tagStr,
                        "creator": Meteor.user().username,
                        "date": currentDate
                    }
                }
            }
        );

        var imageCard = {
            "title": title,
            "image": fileObj._id,
            "tags": tagStr,
            "creator": Meteor.user().username,
            "creatorId": Meteor.user()._id,
            "date": currentDate
        };
        Meteor.call('imageCardInsert', imageCard, function(err, imageCardId) {
            if (err) {
                throwError(err.reason);
            }
        });

    });
});

Template["main"].onCreated(function() {
    
      Session.setDefault('isSearch', "");
    
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
    },
    'click #searchBT': function() {
        var search_content = $("#search").val();
        Session.set('isSearch', search_content);
        $("#search").val() 
        //var result = Meteor.users.find()
    }
});

}

