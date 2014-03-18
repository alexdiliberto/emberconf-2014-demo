export default Ember.Route.extend({
  actions: {
    electronicConsent: function() {
      this.replaceWith('login.terms-of-service-consent');
    },
    reject: function() {
      this.replaceWith('logout');
    }
  }
});
