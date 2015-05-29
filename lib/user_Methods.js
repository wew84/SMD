Meteor.methods({
	editUser: function(updateProperties){
		check(updateProperties, Object);

		var changes = _.extend(Meteor.user().profile, updateProperties);
		Meteor.users.update(Meteor.userId(), {
		      $set: {'profile': changes}
		});
	},

	editUserCourses: function(courseUpdates){
		check(courseUpdates, Array);

		Meteor.users.update(Meteor.userId(), {
		      $set: {'profile.courses': courseUpdates}
		});
	},

	verifyPasswordReset: function() { //After password change, remove the token forcing password changes
		Meteor.users.update(Meteor.userId(), {
		      $set: {'profile.mustChangePassword': false}
		});
	},

	setUserRole: function(userId, role) {
		check(userId, String);
		check(role, String);
		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['administrator'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}
		if(Meteor.users.findOne(userId).username === "administrator") {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}
		return Roles.setUserRoles(userId, [role]);
	}
});
