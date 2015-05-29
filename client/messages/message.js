Template.message.helpers({
	dateToView : function() {
		return this.date.from(moment());
	}
});

Template.message.events = {
  "click .close": function(e) {
    e.preventDefault();
    Meteor.call('completeMessage', this._id);
  }
}