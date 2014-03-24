export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.hasTermsOfServiceConsent')) {
      if (this.get('session.showTour')) {
        this.replaceWith('authenticated.tour');
      } else {
        var transition = this.get('session.transition');
        this.set('session.transition', undefined);
        if (transition) {
          // FIXME: This results in a new history state being created.
          transition.retry();
        } else {
          this.replaceWith('accounts');
        }
      }
    }
  },
  actions: {
    tosConsent: function() {
      // TODO: Server
      this.set('session.hasTermsOfServiceConsent', true);

      if (this.get('session.showTour')) {
        this.replaceWith('authenticated.tour');
      } else {
        var transition = this.get('session.transition');
        this.set('session.transition', undefined);
        if (transition) {
          // FIXME: This results in a new history state being created.
          transition.retry();
        } else {
          this.replaceWith('accounts');
        }
      }
    },
    reject: function() {
      this.replaceWith('logout');
    }
  }
});
