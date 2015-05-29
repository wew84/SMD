Meteor.publish('courses', function(){
	if(Roles.userIsInRole(this.userId, "administrator")){
    	return Courses.find();
	}
	userGrade = Meteor.users.findOne({"_id": this.userId}).profile.grade;
	return Courses.find({"grade": userGrade})
});

Meteor.publish('messages', function(){
	if(Roles.userIsInRole(this.userId, "administrator")){
    	return Messages.find({"completed": false});
	}
	userCourses = Meteor.users.findOne({"_id": this.userId}).profile.courses;
	return Messages.find({"completed": false, "course._id": {"$in": userCourses}});
});

Meteor.publish('messageID', function(id){
	check(id, String)
	return Messages.findOne(id);
});

Meteor.publish('users', function(){
  if(Roles.userIsInRole(this.userId, 'administrator')) {
    return Meteor.users.find();
  }
  this.stop();
  return;
})