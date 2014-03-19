export default Ember.Route.extend({
  beforeModel: function() {
    var model = this.modelFor('one-time-password');
    if (model.length < 1) {
      this.replaceWith('one-time-password.setup');
    }
  },
  model: function() {
    return this.modelFor('one-time-password');
  },

  actions: {
    authenticate: function() {
      // TODO: Make this actually communicate with the server.
      var LoginController = this.controllerFor('login');
      LoginController.set('isAuthorized', true);

      this.replaceWith('one-time-password.register-device');
    }
  }
});
