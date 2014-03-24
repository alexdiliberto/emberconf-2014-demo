export default Ember.Route.extend({
  model: function() {
    return this.modelFor('one-time-password');
  },
  afterModel: function(model, transition) {
    if (model.length === 0) {
      // TODO: Provide user feedback.
      this.replaceWith('contact');
    } else if (model.length === 1) {
      // TODO: Trigger send to server.
      this.replaceWith('one-time-password.authenticate');
    }
  },

  actions: {
    selectDeliveryMethod: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('one-time-password.authenticate');
    }
  }
});
