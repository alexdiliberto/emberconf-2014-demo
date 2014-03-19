export default Ember.Route.extend({
  beforeModel: function(transition) {
    var LoginController = this.controllerFor('login');

    if (LoginController.get('isNotAuthorized')) {
      // We need to redirect the user.

      // Start their login process over.
      LoginController.setProperties({
        isAuthenticated: false,
        isAuthorized: false
      });

      // Capture where the user was going for later.
      LoginController.set('transition', transition);

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  }
});
