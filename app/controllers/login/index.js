export default Ember.Controller.extend({
  error: undefined,

  /* Empty strings since that is how the binding gets coerced for falsey value. */
  username: "",
  password: "",

  errorMessage: function() {
    var error = this.get('error');
    this.set('error', undefined);

    return error;
  }.property('username', 'password')
});
