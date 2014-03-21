export default Ember.Object.extend({
  isAuthenticated: false,
  isAuthorized: false,

  isNotAuthenticated: Ember.computed.not('isAuthenticated'),
  isNotAuthorized: Ember.computed.not('isAuthorized'),

  isPrivileged: Ember.computed.or('isAuthenticated', 'isAuthorized'),
  isNotPrivileged: Ember.computed.not('isPrivileged')
});
