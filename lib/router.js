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

Router.route('/send_messages', {name: 'mesmain'});

Router.route('/received_message', {name:''});

Router.route('/my_upload', {name: 'myupLoad'});
