export default Ember.Route.extend({
  actions: {
    recoverUsername: function() {
      // TODO: Make this actually communicate with the server.
      this.transitionTo('login');
    }
  }
});
