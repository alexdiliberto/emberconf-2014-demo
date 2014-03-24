export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.hasElectronicConsent')) {
      this.replaceWith('login.terms-of-service-consent');
    }
  },
  actions: {
    electronicConsent: function() {
      // TODO: Server
      this.set('session.hasElectronicConsent', true)
      this.replaceWith('login.terms-of-service-consent');
    },
    reject: function() {
      this.replaceWith('logout');
    }
  }
});
