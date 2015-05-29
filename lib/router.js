Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'root',
	template: 'messageList',
	waitOn: function(){
		return [Meteor.subscribe('messages'), Meteor.subscribe('courses')];
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}
});

Router.route('/messages/', {
	name: 'messageList',
	waitOn: function(){
		return [Meteor.subscribe('messages'), Meteor.subscribe('courses')];
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}
});

Router.route('/message/:_id/view/', {
	name: 'message',
	waitOn: function() {
		return Meteor.subscribe('messageID', this.params._id);
	}
	data: function() {
		return Messages.findOne(this.params._id);
	}
});

Router.route('/profile/', {
	name: 'profile',
	waitOn: function(){
		return Meteor.subscribe('courses');
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}

});
Router.route('/course/', {
	name: 'courseList',
	waitOn: function(){
		return Meteor.subscribe('courses');
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}
});

Router.route('/course/:_id/edit/', {
	name: 'courseEdit',
	data: function() {
		return Courses.findOne(this.params._id);
	},
	waitOn: function(){
		return Meteor.subscribe('courses');
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}
});

Router.route('/usermanagement/', {
	name: 'usermanagement',
	waitOn: function(){
		return Meteor.subscribe('users');
	},
	onBeforeAction: function () {
	 	AccountsEntry.signInRequired(this);
	}
});
