export default Ember.Route.extend({
  actions: {
    didTransition: function(transition) {
      // If you see this route the user should be logged out.
      if (this.controllerFor('login').get('authenticated')) {
        App.reset();
      }
    }
  }
});
