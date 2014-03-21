export default Ember.Route.extend({
  actions: {
    didTransition: function(transition) {
      // If you see this route the user should be logged out.
      // If the user has done anything at all in a privileged area blow it away.
      if (this.get('session.isPrivileged')) {
        // FIXME: How would I do this without using the global namespace?
        Emberconf2014Demo.reset();
      }
    }
  }
});
