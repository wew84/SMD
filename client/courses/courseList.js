Template.courseList.helpers({

	courseManager: function() {
		return Courses.find({}, {sort:{'name':1}});
	},

});

Template.courseList.events = {
  "click #create-button": function(e) {
    e.preventDefault();
    Router.go("courseEdit", {_id: null});
  }
};