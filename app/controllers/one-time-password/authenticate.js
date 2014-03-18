export default Ember.ArrayController.extend({
  hasMultipleMethods: function() {
    return this.get('model.length') > 1;
  }.property('@each')
});
