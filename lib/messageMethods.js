//Meteor methods for managing attention entries
Meteor.methods({
	insertMessage: function(msg){
		check(msg, Object)
		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		if(typeof attn.title === "undefined" || attn.title == "") {	//Verify that a reason has been supplied
			throw new Meteor.Error(422, "חובה להזין כותרת");
		}


		var tempTopic = msg.topic;
		msg.topic = UserTools.generateStudentFromName(tempTopic, false); //Returns null if this isn't a student TODO: Returns null for some other bullshit as well
		if(msg.topic == null) { //If this isn't a student, it's some string topic which needs to be stored instead
			msg.topic = tempTopic;
		}

		msg.advisor = [Meteor.user().profile.name];
		msg.completed = false;
		msg.lastEdit = moment().toDate();

		return Messages.insert(msg);
	},

	editMassage: function(msg, updateProperties){
		check(msg, Object)
		check(updateProperties, Object)
		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		if(typeof updateProperties.tile === "undefined" || updateProperties.title == "") {	//Verify that a reason has been supplied
			throw new Meteor.Error(422, "חובה להזין כותרת");
		}

		delete updateProperties.author; //Don't overwrite the student the ticket is assigned to

		updateProperties.date = moment();

		Messages.update(msg._id, {
	      $set: updateProperties
	    });
	    
	    return msg._id;
	},

	completeMessage: function(id){
		check(id, String)

		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		Messages.update(id, {
			$set: {completed: true}
		});
		return id;
	},

	deleteMessage: function(id){
		check(id, String)
		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		Messages.remove(id);
	}

});
