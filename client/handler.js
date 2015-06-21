Meteor.startup(function() {
  Tracker.autorun(function() {
    if (Meteor.user()) {
      var receive = Meteor.user()['profile']['receive'];
      var num = 0;
      for (message in receive) {
        if (!message['read'])
          num = num+1;
      }
    }
  });
});
