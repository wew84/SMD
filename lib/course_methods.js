Meteor.methods({
	insertCourse: function(course) {
		check(course, Object)
		check(course.name, String);
		check(course.grade, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['administrator'])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		return Courses.insert(course);
	},

	deleteCourse: function(courseID) {
		check(courseID, String);

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['administrator'])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		Courses.remove(courseID);
	},

	updateCourse: function(courseID, newCourse) {
		check(courseID, String);
		check(newCourse, Object);
		check(newCourse.name, String);
		check(newCourse.grade, String);

		delete newCourse._id;

		if(!Meteor.user() || !Roles.userIsInRole(Meteor.user(), ['administrator'])) {
			throw new Meteor.Error(403, "אין לך רשות לפעולה זו");
		}

		Courses.update(courseID, newCourse);
	}

});