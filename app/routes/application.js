import analyticsSendHandlers from 'emberconf-2014-demo/utils/analyticsSendHandlers';
import analyticsHandler from 'emberconf-2014-demo/utils/analyticsHandler';
import ajax from 'emberconf-2014-demo/utils/ic-ajax-fixtures';

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

      ajax.raw('/session').then(function(result) {
        this.get('session').setProperties(result.response);

        if (this.get('session.isAuthorized')) {
          if (this.get('session.showTour')) {
            this.replaceWith('authenticated.tour');
          } else {
            this.replaceWith('accounts');
          }
        } else if (this.get('session.isAuthenticated') && this.get('session.willNotSetupOTP')) {
          this.replaceWith('login.electronic-consent');
        } else if (this.get('session.isIdentified') || this.get('session.willSetupOTP')) {
          this.replaceWith('one-time-password');
        } else if (this.get('session.error')) {
          var error = this.get('session.error');
          this.set('session.error', undefined);
          LoginIndexController.set("error", this.get('session.error'));
        }
      }.bind(this));
    },
    logout: function() {
      this.transitionTo('logout');
    },
    /**
     This is needed as a global handler for any '_track' simple actions. Since a '_track' action is
     not route-based, we need a handler on the application route to which all other actions can bubble
     up to. This `_trackAppEvent` handler will fire our normal action handling sequence.
    */
    _trackAppEvent: function() {
      analyticsHandler.apply(this, arguments);
    },
    didTransition: function() {
      Ember.run.once(this, function() {
        analyticsSendHandlers.route(this.router.get('url'));
      });
    }
  }
});
