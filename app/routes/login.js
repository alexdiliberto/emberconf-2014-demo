export default Ember.Route.extend({
  beforeModel: function() {
    // Force controller generation.
    var LoginController = this.controllerFor('login');

    if (LoginController.get('isAuthorized')) {
      // We know who the user is and they're all set up so send them on their merry way.
      this.replaceWith('accounts');
    } else if (LoginController.get('isNotAuthenticated')) {
      // The user is attempting to visit a place that they don't have permission to be.
      // You may only visit login.index if you aren't authenticated.

      // Start their login process over.
      LoginController.setProperties({
        isAuthenticated: false,
        isAuthorized: false
      });

      // Drop the user at the front door.
      this.replaceWith('login');
    }

  }
});
