export default Ember.ArrayController.extend({

  /* Elements for the form to add new OTP delivery methods. */
  value: undefined,

  isEmail: function() {
    var value = this.get('value') || "";

    // RegEx from http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
  }.property('value'),

  isPhone: function() {
    var value = this.get('value') || "";
    var result = false;

    // Phone validation provided by https://code.google.com/p/libphonenumber/
    try {
      result = phoneUtils.isValidNumber(value, "us");
    } catch (e) {
      // Do nothing.
    }

    return result;
  }.property('value'),

  isValid: function() {
    return this.get('isEmail') || this.get('isPhone');
  }.property('isEmail', 'isPhone'),

  isNotValid: Ember.computed.not('isValid'),

  type: function() {
    return this.get('isPhone') ? "phone" : "email";
  }.property('isValid'),

  formattedValue: function() {
    var value = this.get('value');
    var phone, email;

    if (this.get('isPhone')) {
      if (phoneUtils.getRegionCodeForNumber(value) == "US") {
        phone = phoneUtils.formatNational(value, "US");
      } else {
        phone = phoneUtils.formatOutOfCountryCallingNumber(value, "US", "US");
      }
    } else {
      email = value;
    }

    return phone || email;
  }.property('value'),

  /* Elements based upon the model. */
  hasMethods: function() {
    return this.get('model.length') > 0;
  }.property('@each'),

  hasNoMethods: Ember.computed.not('hasMethods')

});
