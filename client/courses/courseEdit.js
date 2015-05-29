Template.courseEdit.helpers = {
  isNewCourse: function() {
    return this._id == null || this._id == "null";
  },
  isInGrade: function(testGrade) {
    return this.grade == testGrade;
  }
}
Template.courseEdit.events = {
  "submit form": function(e) {
    e.preventDefault();
    var courseUpdateProperties = {
      name: $(e.target).find("[name=nameinput]").val(),
      grade: $(e.target).find("[name=gradeselect]:checked").val()
    };
    if(this._id == null || typeof this._id == "undefined"){
      Meteor.call('insertCourse', courseUpdateProperties, log_error);
    } else {
      Meteor.call('updateCourse', this._id, courseUpdateProperties, log_error);
    }
   
  },

  "click #delete-button": function(e) {
    e.preventDefault();
    Meteor.call('deleteCourse', this._id, log_error);
  }
}

log_error = function(error, id) {
    if(error) {
    console.log(error);
  } else {
    Router.go('courseList');
  }
}
