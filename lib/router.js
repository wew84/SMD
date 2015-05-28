Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
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
	name: 'permitEdit',
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