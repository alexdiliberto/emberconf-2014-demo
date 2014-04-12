import analyticsHandler from 'emberconf-2014-demo/utils/analyticsHandler';

export default {
  name: 'analytics',
  initialize: function(container, app) {
    /* Reopen ActionHandler and perform processing on the send() function */
    Ember.ActionHandler.reopen({
      send: function(actionName) {
        analyticsHandler.apply(this, arguments);
      }
    });
  }
}
