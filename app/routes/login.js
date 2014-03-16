export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('controller.authenticated')) {
      this.replaceWith('accounts');
    }
  }
});
