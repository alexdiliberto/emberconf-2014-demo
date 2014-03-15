export default Ember.Route.extend({
  actions: {
    login: function() {
      this.controllerFor('login').set('authenticated', true);

      // The login page doesn't belong in the user's history. It's just confusing.
      var currentHandlerInfos = this.router.router.currentHandlerInfos;
      var leafCurrentHandler = currentHandlerInfos.length ? currentHandlerInfos[currentHandlerInfos.length-1].name : undefined;

      if (leafCurrentHandler == 'login') {
        // Use replaceState instead of pushState for requests coming from the full login route.
        this.replaceWith('authenticated.accounts');
      } else {
        // Otherwise they've logged in using some sort of login widget, don't destroy that history element.
        this.transitionTo('authenticated.accounts');
      }
    },
    logout: function() {
      this.transitionTo('logout');
    }
  }
});
