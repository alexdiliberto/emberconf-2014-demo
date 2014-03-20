export default Ember.Route.extend({
  actions: {
    recoverPasswordOneTimePassword: function() {
      // TODO: Make this actually communicate with the server.
      // TODO: If the user doesn't have a OTP delivery methods kick them to `contact`
      var LoginController = this.controllerFor('login');
      LoginController.set('isAuthenticated', true);

      this.replaceWith('one-time-password.select-delivery-method');
    }
  }
});
