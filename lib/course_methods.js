Meteor.methods({
	insertCourse: function(course) {
		check(course.name, String);
		check(course.grade, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		return Courses.insert(item);
	},

	deleteCourse: function(courseID) {
		check(courseID, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Courses.remove(courseID);
	},

	updateCourse: function(courseID, newCourse) {
		check(courseID, String);
		check(newCourse.name, String);
		check(newCourse.grade, String);

		delete newCourse._id;

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['admin'])) {
			throw new Meteor.Error(403, "You do not have permission to do that");
		}

		Courses.update(courseID, newItem);
	}

});