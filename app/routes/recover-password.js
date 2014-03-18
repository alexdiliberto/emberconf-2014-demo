export default Ember.Route.extend({
  actions: {
    recoverPasswordEmail: function() {
      // TODO: Make this actually communicate with the server.
      this.transitionTo('login');
    },
    recoverPasswordOneTimePassword: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('one-time-password.select-delivery-method');
    }
  }
});
