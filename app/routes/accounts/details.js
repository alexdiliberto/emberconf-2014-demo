export default Ember.Route.extend({
  /**
    In normal scenarios, the {{link-to}} helper will work
    just fine and this isn't needed. In scenarios with manual
    URL manipulation or deep linking cases, we will need this
    model hook to yeild the correct "account" object.
  */
  model: function(params) {
    return this.modelFor('accounts').filter(function(acct) {
      return acct.id == params.account_id;
    })[0];
  },
  actions: {
    didTransition: function() {
      if(!this.currentModel) {
        this.transitionTo('accounts');
      }
    }
  }
});
