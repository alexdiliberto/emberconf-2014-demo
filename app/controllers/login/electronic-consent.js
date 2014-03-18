export default Ember.Controller.extend({
  isConsenting: false,
  isNotConsenting: Ember.computed.not('isConsenting')
})
