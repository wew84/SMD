Template.personalSettings.helpers({
  forcePermission: function() {
    //Force can only be used against other people's passwords
    return Roles.userIsInRole(Meteor.user(), ['administrator']) && this._id != Meteor.userId();
    console.log(this)
  },
  ownProfile: function() {
    return this._id == Meteor.userId();
  },
  isInGrade : function(grade) {
  	return grade == Meteor.user().profile.grade;
  },
  name : function() {
    return Meteor.user().profile.name;
  }
});

Template.personalSettings.events = {
  "submit #changepassword": function(e) {
    e.preventDefault();
    var currentPassword = $("[name=currentpassword]").val();
    var newPassword = $("[name=newpassword]").val();
    var confirmPassword = $("[name=confirmpassword]").val();
    if(newPassword != confirmPassword) {
      toastr.error("הסיסמא החדשה ואישורה לא זהים");
      return;
    }

    if(newPassword.length < 8) {
      toastr.error("הסיסמא החדשה חייבת לכלול לפחות 8 תווים");
      return;
    }
    
    Accounts.changePassword(currentPassword, newPassword, function(error) {
      if(error){
        toastr.error(error.reason);
      } else {
        $("[name=currentpassword]").val('');
        $("[name=newpassword]").val('');
        $("[name=confirmpassword]").val('');
        Meteor.call('verifyPasswordReset', function(error) {
          if(error){
            toastr.error(error.reason);
           } else { 
           toastr.success("הסיסמא שונתה")
           }
        });
      }
    });
    return;
  },
  "submit #personalSettings": function(e) {
    e.preventDefault();
    var changes = {
    	name: $(e.target).find("[name=nameInput]").val(),
    	grade: $(e.target).find("[name=gradeInput]").val(),
    }
    Meteor.call("editUser", changes, function(error) {
      if(error){
        toastr.error(error.reason);
      } else {
        
      }
    });
    return;
  }
};