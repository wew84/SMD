Meteor.startup(function(){
	if(Meteor.users.find().count() == 0){
		console.log("Created Default Administrator")
		adminId = Accounts.createUser({
		  username: "administrator",
		  password: "password1",
		  profile: {
		  	name: "Administrator",
		  }
		});

		Roles.addUsersToRoles(adminId, "administrator");
	}
});