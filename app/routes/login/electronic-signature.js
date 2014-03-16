export default Ember.Route.extend({
  actions: {
    eSignAccept: function() {
      console.log('eSignAccept');
    },
    eSignDoNotAccept: function() {
      console.log('eSignDoNotAccept');
      this.replaceWith('e-sign-do-not-accept');
    }
  }
});
