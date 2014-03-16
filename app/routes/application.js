export default Ember.Route.extend({
  actions: {
    login: function() {
      var LoginController = this.controllerFor('login');

      // Logging in, store the state of authentication.
      // TODO: Make authentication hit a server.
      if (true) {
        LoginController.set('authenticated', true);

        // Figure out where to go.
        var transition = LoginController.get('transition');
        if (transition) {
          // We already have a saved transition, use it.
          LoginController.set('transition', undefined);
          transition.retry();
        } else {
          // We are going to direct the user to the default login page.
          // "Slice" the login page out of the user's history since it redirects to the dashboard when authenticated.
          var currentHandlerInfos = this.router.router.currentHandlerInfos;
          var leafCurrentHandler = currentHandlerInfos.length ? currentHandlerInfos[currentHandlerInfos.length-1].name : undefined;

          // Use replaceState instead of pushState for requests coming from the full login route.
          var method = (leafCurrentHandler.indexOf('login') === 0 ? "replaceWith" : "transitionTo");
          this[method]('accounts');
        }
      } else {
        // TODO: Remove username and password, set error.
      }
    },
    logout: function() {
      this.transitionTo('logout');
    }
  }
});
