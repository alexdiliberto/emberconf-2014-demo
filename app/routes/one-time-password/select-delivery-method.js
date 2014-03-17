export default Ember.Route.extend({
  model: function() {
    // TODO: Make this load from the server.
    return [
      { id: 1, type: 'phone', value: '5555555555' },
      { id: 2, type: 'email', value: 'example@example.com' }
    ];
  },
  afterModel: function(model) {
    // TODO: Protect from errors.
    if (model.length === 0) {
      this.replaceWith('one-time-password.setup');
    }
  },
  actions: {
    selectDeliveryMethod: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('one-time-password.authenticate');
    }
  }
});
