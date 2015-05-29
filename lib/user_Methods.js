Meteor.methods({
	editUser: function(updateProperties){
		check(updateProperties, Object);

		var changes = _.extend(Meteor.user().profile, updateProperties);
		Meteor.users.update(Meteor.userId(), {
		      $set: {'profile': changes}
		});

		return;
	},

	verifyPasswordReset: function() { //After password change, remove the token forcing password changes
		Meteor.users.update(Meteor.userId(), {
		      $set: {'profile.mustChangePassword': false}
		});
	},

});
