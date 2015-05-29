// Template.commentItem.helpers({
// 	submittedDate: function() {
// 		return this.data.toString();
// 	}
// });

Template.commentItem.helpers({
  submittedDate: function() {
    return this.date.toString();
  }
});