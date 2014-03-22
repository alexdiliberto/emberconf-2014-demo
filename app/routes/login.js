export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.isAuthorized')) {
      // We know who the user is and they're all set up so send them on their merry way.
      this.replaceWith('accounts');
    } else if (this.get('session.isNotAuthenticated')) {
      // The user is attempting to visit a place that they don't have permission to be.
      // You may only visit login.index if you aren't authenticated.

      // Start their login process over.
      this.get('session').setProperties({
        isAuthenticated: false,
        isAuthorized: false
      });

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  }
});
