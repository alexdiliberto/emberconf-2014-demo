export default Ember.Route.extend({
  beforeModel: function() {
    var model = this.modelFor('one-time-password');
    if (model.length === 1) {
      // TODO: Trigger send.
      this.replaceWith('one-time-password.authenticate');
    } else if (model.length === 0) {
      this.replaceWith('one-time-password.setup');
    }
  },
  model: function() {
    return this.modelFor('one-time-password');
  },

  actions: {
    selectDeliveryMethod: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('one-time-password.authenticate');
    }
  }
});
