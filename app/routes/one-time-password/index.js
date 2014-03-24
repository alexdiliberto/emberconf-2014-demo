export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.willSetupOTP')) {
      this.replaceWith('one-time-password.setup');
    } else {
      this.replaceWith('one-time-password.select-delivery-method');
    }
  }
})
