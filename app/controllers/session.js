export default Ember.Object.extend({
  // From server.
  isIdentified: false,
  isNotIdentified: Ember.computed.not('isIdentified'),

  // From server.
  isAuthenticated: false,
  isNotAuthenticated: Ember.computed.not('isAuthenticated'),

  isPrivileged: Ember.computed.or('isIdentified', 'isAuthenticated', 'isAuthorized'),
  isNotPrivileged: Ember.computed.not('isPrivileged'),

  willSetupOTP: false,
  willNotSetupOTP: Ember.computed.not('willSetupOTP'),

  isAuthorized: Ember.computed.and('isIdentified', 'isAuthenticated', 'willNotSetupOTP', 'hasElectronicConsent', 'hasTermsOfServiceConsent'),
  isNotAuthorized: Ember.computed.not('isAuthorized'),

});
