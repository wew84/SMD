Template.usermanagement.helpers({
	userManager: function() {
		return Meteor.users.find({}, {sort: {'roles': -1, 'profile.name': 1}});
	}
});
