Template.courseList.helpers({

	courseManager: function() {
		return Courses.find({}, {sort:{'name':1}});
	},

});

Template.courseList.events = {
  "click #create-button": function(e) {
    e.preventDefault();
    Router.go("courseEdit", {_id: null});
  },
  "click #courseChange": function(e) {
  	e.preventDefault();
    var courses = _.map($.find(".course-checkbox:checked"), function(elem){return $(elem).data("id");})
  	Meteor.call("editUserCourses", courses, function(error) {
      if(error){
        toastr.error(error.reason);
      } else {
      	
      }
    });
  }
};