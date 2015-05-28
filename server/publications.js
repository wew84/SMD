Meteor.publish('courses', function(){
    return Courses.find();
});

Meteor.publish('messages', function(){
	return Messages.find();
});

Meteor.publish('users', function(){
  if(Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find();
  }
  this.stop();
  return;
})