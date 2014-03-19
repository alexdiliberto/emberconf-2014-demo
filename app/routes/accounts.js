export default Ember.Route.extend({
  model: function() {
    return [{
        id: 1,
        name: 'Checking',
        amount: 1000
      },{
        id: 2,
        name: 'Savings',
        amount: 5000
      },{
        id: 3,
        name: 'CD',
        amount: 750
      }
    ];
  }
});
