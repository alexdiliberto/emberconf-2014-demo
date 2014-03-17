export default Ember.Route.extend({
  actions: {
    resetPassword: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('accounts');
    }
  }
});
