Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/sign-in/',                    // mandatory - path to redirect to after sign-out
    dashboardRoute: '/profile',      // mandatory - path to redirect to after successful sign-in
    passwordSignupFields: 'USERNAME_ONLY',
    extraSignUpFields: [{             // Add extra signup fields on the signup page
      field: "name",                           // The database property you want to store the data in
      label: "שם",                      // The html lable for the field
      type: "text",                            // The type of field you want
      required: true                           // Adds html 5 required property if true
     },
     {            
      field: "grade",                           // The database property you want to store the data in
      label: "שכבה",                      // The html lable for the field
      type: "text",                            // The type of field you want
      required: true                           // Adds html 5 required property if true
     }]
  });
});