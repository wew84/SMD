Template.messageGenerator.helpers({
	courseManager: function() {
		return Courses.find({}, {sort: {name: 1}});
	}
});

Template.messageGenerator.events({
	"submit form": function(e) {
		e.preventDefault();

		var entry = {
			topic: $(e.target).find("[name=topicinput]").val(),
			body: $(e.target).find("[name=bodyinput]").val(),
			course: $(e.target).find("#courseinput").val(),
		};

		Meteor.call('insertMessage', entry, function(error, id) {
			if(error){

	      	} else {
	      		$('#msgform')[0].reset();
	      	}
		});
	}
});
