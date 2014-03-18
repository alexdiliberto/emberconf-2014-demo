export default Ember.Route.extend({
  beforeModel: function() {
    this.replaceWith('one-time-password.setup');
  }
})
