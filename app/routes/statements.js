export default Ember.Route.extend({
  /**
    Simulating a 2 second response on the statements route which
    will then result in a rejected promise and simulate an error
    scenario for testing and demonstration purposes only.
  */
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run.later(function() {
        reject("Some Random Error");
      }, 2000);
    }).then(function(value) {
      return "Success";
    }, function(value) {
      return "Error: " + value;
    });
  }
});
