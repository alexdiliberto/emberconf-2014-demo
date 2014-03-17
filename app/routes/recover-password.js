export default Ember.Route.extend({
  actions: {
    recoverPassword: function() {
      // TODO: Make this actually communicate with the server.
      this.transitionTo('login');
    }
  }
});
