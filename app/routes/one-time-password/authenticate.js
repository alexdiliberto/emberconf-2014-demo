export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      this.replaceWith('one-time-password.register-device');
    }
  },
  model: function() {
    return this.modelFor('one-time-password');
  },

  actions: {
    authenticate: function() {
      // TODO: Make this actually communicate with the server.
      this.set('session.isAuthenticated', true);

      this.replaceWith('one-time-password.register-device');
    }
  }
});
