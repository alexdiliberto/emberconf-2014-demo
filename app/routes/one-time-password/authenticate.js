export default Ember.Route.extend({
  actions: {
    authenticate: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('one-time-password.register-device');
    }
  }
});
