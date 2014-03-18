export default Ember.Route.extend({
  actions: {
    tosConsent: function() {
      this.replaceWith('accounts');
    },
    reject: function() {
      this.replaceWith('logout');
    }
  }
});
