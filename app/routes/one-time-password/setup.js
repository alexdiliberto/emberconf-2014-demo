export default Ember.Route.extend({
  model: function() {
    return [];
  },
  afterModel: function(model) {
    if (model.length > 0) {
      this.replaceWith('one-time-password.select-delivery-method');
    }
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
      } else {
        // TODO: Show error.
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
      this.replaceWith('one-time-password.register-device');
    }
  }
});
