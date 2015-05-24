if(Meteor.isClient) {
	Meteor.subscribe('images');
}

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Images.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	}
});