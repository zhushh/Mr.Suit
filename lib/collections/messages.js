Messages = new Mongo.Collection("message");
Messages.allow({
  update : function() {return true},
  insert : function() {return true}
});