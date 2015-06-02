if (Meteor.isClient) {

Template["register"].onRendered(function() {
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
});

Template["register"].events({
    'click .signup': function() {
        var username = $("input[name='username']").val();
        var password = $("input[name='password']").val();
        var email = $("input[name='email']").val();
        var gender = $("select").val();
        if (gender == "" || username == "" || password == "" || email == "") {
            alert("Please complete the form fully");
            return;
        }
        Accounts.createUser({
            "username": username,
            "password": password,
            "email": email,
            "profile": {"gender": gender}
        }, function(err) {
            if (err) {
                alert("Username has been occupied");
            }
        })
        Messages.insert({
            "username": username,
            "receive" : {},
            "send"    : {},
            "rencent" : []
        });
    },
    'click .login': function() {
        var username = $("input[name='loginName']").val();
        var password = $("input[name='loginPassword']").val();
        if (username == "" || password == "") {
            alert("Username or password is wrong");
            return;
        }
        Meteor.loginWithPassword(username, password, function(err) {
            if (err) {
                alert("Username or password is wrong");
            }
        });
    }
});

}
