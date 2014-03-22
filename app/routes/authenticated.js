export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.get('session.isNotAuthorized')) {
      // We need to redirect the user.

      // Start their login process over.
      this.get('session').setProperties({
        isAuthenticated: false,
        isAuthorized: false
      });

      // Capture where the user was going for later.
      this.set('session.transition', transition);

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  },
});
