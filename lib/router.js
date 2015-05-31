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

Router.route('/send_message', {name: 'messend'});

Router.route('/received_message', {name:''});