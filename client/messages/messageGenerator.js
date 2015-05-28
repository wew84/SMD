Template.msgGenerator.events = {
	"submit form": function(e) {
		e.preventDefault();

		var entry = {
			date: moment(),
			body: $(e.target).find("[name=bodyInput]").val(),
			response: $(e.target).find("[name=titleInput]").val(),
			author: Meteor.user(),
		};

		if (entry.response == "")
			entry.response = "אין";

		Meteor.call('insertMessage', entry, function(error, id) {
			if(error){

	      	} else {
	      		$('#msgform')[0].reset();
	      	}
		});
	}
}
