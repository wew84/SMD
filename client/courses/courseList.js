Template.courseList.helpers({

	itemManager: function() {
		return Items.find({}, {sort:{'name':1}});
	},

});

Template.courseList.events = {
  "click #create-button": function(e) {
    e.preventDefault();
    Router.go("courseEdit", {_id: null});
  }
};