export default Ember.Route.extend({
  /**
    Simulating a 2 second response on the statements route which
    will then result in a rejected promise and simulate an error
    scenario for testing and demonstration purposes only.
  */
  model: function() {
    var self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run.later(function() {
        reject({ stack: "Oh No! Statements route is slow and it causes an error." });
      }, 2000);
    });
  }
});
