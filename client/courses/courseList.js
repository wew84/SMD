Template.courseList.helpers({

	itemManager: function() {
		return Items.find({}, {sort:{'name':1}});
	},

});

Template.courseList.events = {
  "click #create-button": function(e) {
    e.preventDefault();
    Router.go("courseEdit", {_id: null});
  },
  "click #courseChange": function(e) {
  	e.preventDefault();

  	var courses = _.pluck($.find(".utility-checkbox:checked"), "data-id");
  	Meteor.call("editUser", courses, function(error) {
      if(error){
        toastr.error(error.reason);
      } else {
      	
      }
    });
  }
};