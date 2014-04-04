import Resolver from 'ember/resolver';
import session from 'emberconf-2014-demo/utils/session';
import analyticsHandler from 'emberconf-2014-demo/utils/analyticsHandler';

Ember.MODEL_FACTORY_INJECTIONS = true;

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
