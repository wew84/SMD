//Defines a database for Messages
Messages = new Meteor.Collection('messages');

/* messages database
{
	date: Date(), 
	title: string,
	body string,
	author: {a user object},
	_id: ObjectID("..")
}
*/