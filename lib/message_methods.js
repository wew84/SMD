//Meteor methods for managing attention entries
Meteor.methods({
	insertMessage: function(msg){
		check(msg, Object);
		check(msg.topic, String);
		check(msg.body, String);
		check(msg.course, String)

		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		if(msg.topic == null || msg.topic === "") {
			throw new Meteor.Error(403, "חובה להוסיף כותרת");
		}
		msg.course = Courses.findOne(msg.course);
		msg.author = Meteor.user();
		msg.date = moment().toDate();
		msg.completed = false;
		return Messages.insert(msg);
	},

	editMessage: function(msg, updateProperties){
		check(msg, Object)
		check(updateProperties, Object)
		if(!Roles.userIsInRole(Meteor.user(), ["administrator"])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		if(typeof updateProperties.topic === undefined || updateProperties.topic == "") {
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
