import Resolver from 'ember/resolver';
import session from 'emberconf-2014-demo/utils/session';
import analyticsHandler from 'emberconf-2014-demo/utils/analyticsHandler';

Ember.MODEL_FACTORY_INJECTIONS = true;

// ic.ajax.defineFixture('/session', {
//   response: {
//     /* Successfully identified username and password. */
//     isIdentified: true,

//     /* Related to one-time-passcode. */
//     willSetupOTP: false,
//     isAuthenticated: false,

//     hasElectronicConsent: true,
//     hasTermsOfServiceConsent: false,
//     showTour: false
//   },
//   textStatus: 'success'
// });

// ic.ajax.defineFixture('/one-time-password-methods', {
//   response: [
//     { id: 1, type: 'phone', value: '5555555555' },
//     { id: 2, type: 'email', value: 'example@example.com' }
//   ],
//   // response: [
//   //  { id: 1, type: 'phone', value: '5555555555' }
//   // ],
//   // response: [],
//   textStatus: 'success'
// });

// ic.ajax.defineFixture('/one-time-password-authenticate', {
//   response: {
//     isAuthenticated: true
//   },
//   textStatus: 'success'
// });

Ember.Application.initializer({
  name: 'session',
  initialize: function(container, app) {
    container.register('session:main', session);
    app.inject('route', 'session', 'session:main');
  }
});

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'emberconf-2014-demo', // TODO: loaded via config
  Resolver: Resolver
});

/* Reopen ActionHandler and perform processing on the send() function */
Ember.ActionHandler.reopen({
  send: function(actionName) {
    analyticsHandler.apply(this, arguments);
  }
});

export default App;
