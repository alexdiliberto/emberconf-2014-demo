import ajax from 'emberconf-2014-demo/utils/ic-ajax-fixtures';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    if (this.get('session.isNotIdentified')) {
      // We need to redirect the user.

      // Start their login process over.
      this.get('session').setProperties({
        isIdentified: false,
        isAuthenticated: false
      });

      // Drop the user at the front door.
      this.replaceWith('login');
    }
  },
  model: function() {
    return ajax.raw('/one-time-password-methods').then(function(result) {
      return result.response;
    })
  }
})
