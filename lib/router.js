Router.configure({
  layoutTemplate: "index"
});

Router.route('/', {name: 'postsList'});

Router.route('/postPage/:_id', {
	name: 'postPage',
	data: function () {
		return ImageCards.findOne({image: this.params._id});
	}
});

Router.route('/message', {name: 'mesmain'});

Router.route('/my_upload', {name: 'myupLoad'});

Router.route('/searchPage', {name: 'searchPage'});

Router.route('/myLike', {name: 'myLike'});