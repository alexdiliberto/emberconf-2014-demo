export default Ember.Route.extend({
  beforeModel: function(transition) {
    var LoginController = this.controllerFor('login');

    // TODO: Make this aware of the full and partial authentication scenarios.
    if (!LoginController.get('authenticated')) {
      // We need to redirect the user.
      // Capture where the user was going for later.
      LoginController.set('transition', transition);

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  }
});
