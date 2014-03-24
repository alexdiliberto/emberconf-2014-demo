export default Ember.Route.extend({
  actions: {
    registerDevice: function() {
      // TODO: Make this actually communicate with the server.
      this.replaceWith('login.electronic-consent');
    }
  }
});
