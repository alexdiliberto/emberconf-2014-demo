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

    // The user needs to create delivery methods for their OTPs.
    if (model.length === 0) {
      this.replaceWith('one-time-password.setup');
    }

    // The user only has one delivery method so we can skip selection and just ask them to authenticate.
    if (model.length === 1) {
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
