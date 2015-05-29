Template.course.helpers({
	userHasCourse: function() {
		return _.contains(Meteor.user().profile.courses, this._id);
	}
});
