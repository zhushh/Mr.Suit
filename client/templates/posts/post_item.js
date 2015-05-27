Template.postItem.helpers({
  getImage: function(id) {
    return Images.findOne({_id: id}).url();
  }
});