export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.isAuthorized')) {
      var transition = this.get('session.transition');
      if (transition) {
        // We already have a saved transition, use it.
        this.set('session.transition', undefined);
        transition.retry();
      } else {
        this.replaceWith('accounts');
      }

    } else {
      // Start their login process over.
      this.get('session').setProperties({
        isIdentified: false,
        isAuthenticated: false
      });

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  }
});
