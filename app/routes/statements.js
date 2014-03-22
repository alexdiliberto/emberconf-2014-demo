export default Ember.Route.extend({
  /**
    Simulating a 2 second response on the statements route which
    will then result in a rejected promise and simulate an error
    scenario for testing and demonstration purposes only.
  */
  model: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run.later(this, function() {
        this.send('_trackAppEvent', '_trackPromise', 'statements#model', 'reject');
        reject("Some Random Error");
      }, 2000);
    }.bind(this)).then(function(value) {
      return "Success";
    }, function(value) {
      return "Error: " + value;
    });
  }
});
