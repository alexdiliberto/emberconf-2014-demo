export default Ember.Route.extend({
  actions: {
    submit: function() {
      // TODO: Make this actually communicate with the server.
      this.transitionTo('login');
    }
  }
});
