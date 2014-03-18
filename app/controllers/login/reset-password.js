export default Ember.Controller.extend({
  containsNumber: function() {
    return /[0-9]/.test(this.get('password1'));
  }.property('password1'),

  containsUppercase: function() {
    return /[A-Z]/.test(this.get('password1'));
  }.property('password1'),

  isRightLength: function() {
    var length = this.get('password1.length');
    return length >= 10;
  }.property('password1'),

  isMatching: function() {
    return this.get('password1') == this.get('password2');
  }.property('password1', 'password2'),

  isValid: Ember.computed.and('containsNumber', 'containsUppercase', 'isRightLength', 'isMatching'),
  isNotValid: Ember.computed.not('isValid')
})
