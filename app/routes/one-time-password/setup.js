export default Ember.Route.extend({
  beforeModel: function() {
    if (!this.get('session.willSetupOTP')) {
      this.replaceWith('one-time-password');
    }
  },
  model: function() {
    return this.modelFor('one-time-password');
  },

  actions: {
    add: function() {
      var isValid = this.get('controller.isValid');

      if (isValid) {
        var value = this.get('controller.formattedValue');
        var type = this.get('controller.type');

        this.set('controller.value', undefined);

        this.get('controller.model').pushObject({
          type: type,
          value: value
        });
      }
    },
    remove: function(deliveryMethod) {
      var model = this.get('controller.model').reject(function(item) {
        return deliveryMethod === item;
      }, this);

      this.set('controller.model', model);
    },
    commit: function() {
      // TODO: Send the OTP to the server.
      this.set('session.willSetupOTP', false);
      this.replaceWith('one-time-password.register-device');
    }
  }
});
