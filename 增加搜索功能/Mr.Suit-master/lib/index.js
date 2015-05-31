if(Meteor.isClient) {
	Meteor.subscribe('images');
	Meteor.subscribe('allUserData');
	Meteor.subscribe('comments');
	Meteor.subscribe('imageCards');
}

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("pictures", {path: "~/uploads"})]
});

Images.allow({
	insert: function() {
		return true;
	},
	update: function() {
		return true;
	},
	download: function () {
        		return true;
    	},
    remove: function() {
    	return true;

    }
});