export default Ember.Route.extend({
  beforeModel: function(transition) {
    var LoginController = this.controllerFor('login');

    if (!LoginController.get('authenticated')) {
      // We need to redirect the user.
      // Capture where the user was going for later.
      LoginController.set('transition', transition);

      // Drop the user at the front door.
      this.replaceWith('login');
    } else {
      // They can already go there, get rid of any login-saved transition.
      LoginController.set('transition', undefined);
    }
  }
});
