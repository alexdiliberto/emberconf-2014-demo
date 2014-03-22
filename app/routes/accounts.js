export default Ember.Route.extend({
  model: function() {
    return this.modelFor('accounts') || Ember.A([
      Ember.Object.create({
        id: 1,
        name: 'Checking',
        amount: 1000
      }),
      Ember.Object.create({
        id: 2,
        name: 'Savings',
        amount: 5000
      }),
      Ember.Object.create({
        id: 3,
        name: 'CD',
        amount: 750
      })
    ]);
  }
});
