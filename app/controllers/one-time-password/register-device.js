export default Ember.Controller.extend({
  shouldRegisterBool: false,

  shouldRegister: function(key, value) {
    if (arguments.length > 1) {
      this.set('shouldRegisterBool', value === "true" ? true : false);
    }

    return this.get('shouldRegisterBool') ? "true" : "false";
  }.property('shouldRegisterBool')
});
