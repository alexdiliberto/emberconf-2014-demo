export default Ember.Route.extend({
  model: function() {
    // TODO: Load this from the server.
    return [];
    return [
      { id: 1, type: 'phone', value: '5555555555' },
      { id: 2, type: 'email', value: 'example@example.com' }
    ];
  }
})
