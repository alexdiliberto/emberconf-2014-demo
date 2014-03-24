export default Ember.ObjectController.extend({
  htmlid: function() {
    return 'deliverymethod' + this.get('id');
  }.property('id'),

  formattedValue: function() {
    var value = this.get('value');
    var phone, email;

    if (this.get('type') == 'phone') {
      if (phoneUtils.getRegionCodeForNumber(value) == "US") {
        phone = phoneUtils.formatNational(value, "US");
      } else {
        phone = phoneUtils.formatOutOfCountryCallingNumber(value, "US", "US");
      }
    } else {
      email = value;
    }

    return phone || email;
  }.property('value')
});
