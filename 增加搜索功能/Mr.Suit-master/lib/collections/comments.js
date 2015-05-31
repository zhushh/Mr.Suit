Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      image: String,
      content: String
    });
    var user = Meteor.user();
    var card = Meteor.users.find({"image": commentAttributes.image});
    if (!card) {
      throw new Meteor.Error('invalid-comment', 'You must comment on a post');
    }
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      date: new Date()
    });
    return Comments.insert(comment);
  }
});