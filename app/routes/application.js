
import analyticsSendHandlers from 'emberconf-2014-demo/utils/analyticsSendHandlers';

export default Ember.Route.extend({
  actions: {
    login: function() {
      var LoginIndexController = this.controllerFor('login.index');

      // Save off and reset username and password so that they never stick around.
      // Lots of login-focused activities need this sort of cleanup to be "safe."
      var username = LoginIndexController.get('username');
      var password = LoginIndexController.get('password');

      LoginIndexController.setProperties({
        username: "",
        password: ""
      });

      // Logging in, store the state of authentication.
      // TODO: Make authentication hit a server.
      if (true) {
        this.set('session.isAuthenticated', true);

        // TODO: Redirect to the next step. Which is?
        this.replaceWith('one-time-password');
        return;

        // Figure out where to go.
        var transition = this.get('session.transition');
        if (transition) {
          // We already have a saved transition, use it.
          this.set('session.transition', undefined);
          transition.retry();
        } else {
          // We are going to direct the user to the default login page.
          // Use replaceState instead of pushState for requests coming from the full login route.
          var method = (this.router.isActive('login') ? "replaceWith" : "transitionTo");
          this[method]('accounts');
        }
      } else {
        LoginIndexController.set("error", "There was an error.");
      }
    },
    logout: function() {
      this.transitionTo('logout');
    },
    didTransition: function() {
      Ember.run.once(this, function() {
        analyticsSendHandlers.route(this.router.get('url'));
      });
    }
  }
});
