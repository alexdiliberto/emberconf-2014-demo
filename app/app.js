import Resolver from 'ember/resolver';
import session from 'emberconf-2014-demo/controllers/session';

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
  Resolver: Resolver['default']
});

/* Analytics object definition. */
var analytics = Ember.Object.create({
  _: { var1: true, var2: false }, // default information that will be passed on every request
  _global: { // non route-based actions
    _trackPromise: function(route, status) { return { var3: route, var4: status }; } // You may set the processor to be a function and return a POJO.
  },
  login: {
    login: function(user) { return { var3: "login", var4: user }; }
  },
  products: { // route name
    product: {  // leaf-most route name (note the nesting)
      vote: function(vote, color, product) { return { var3: vote, var4: color, var5: product }; },
      otherStuff: { var3: 'other-stuff' } // action name
      // ... If the action doesn't exist, there will be no tracking
    }
  }
});

/* Handlers - Replace this with the actual analytics library calls */
var analyticsSendHandlers = {
  route: function(information) { console.log('*** '+JSON.stringify(information)); },
  action: function(information) { console.log('*** '+JSON.stringify(information)); }
};

var analyticsHandler = function(actionName) {
  debugger;

  /* Get router handle by scope (different: send versus action) */
  var target = this.target;
  var router = target ? target.router : this.router.router;

  /* If there is a currently active transition, grab the target name */
  var activeTransition = router.activeTransition && router.activeTransition.targetName;

  /* Get the active leaf-most route name */
  var curHandlerInfos = router.currentHandlerInfos;
  var activeLeafMostRoute = curHandlerInfos[curHandlerInfos.length - 1].name;

  /**
   Fetch the correct analytics route handler object from the lookup table based on the following in order:
    1. If currently transition to route, get that route's handler
    2. Otherwise, get the active leaf-most route handler
    3. If either of those do not resolve, look in _global
    4. Finally, if none resolve, then there will be no tracking
  */
  var routeName = activeTransition || activeLeafMostRoute;

  /**
   Find the correct route handler based on the router name and action name. Search in the following order:
    1. routename.actionname
    2. routename.actionname (where routename is stripped of .index)
    3. _global.actionname
  */
  var trackobject = analytics.get(routeName+'.'+actionName) || analytics.get(routeName.replace('.index','')+'.'+actionName) || analytics.get('_global.'+actionName);

  /* Route handlers can be simple objects or functions, if function then apply the supplied arguments */
  if (typeof trackobject == 'function') {
    trackobject = trackobject.apply(this, [].slice.call(arguments, 1)); // "shift" arguments array to pop off the first argument (action name)
  }

  /* Merge the route handler with the variables sent on every route then send fire the analytics action handler */
  if (trackobject) {
    analyticsSendHandlers.action(Ember.Object.create(analytics.get('_'), trackobject));
  }

  /* Skip the default action handling on simple tracking */
  if (actionName.indexOf('_track') !== 0) {
    this._super.apply(this, arguments);
  }
};

/* Reopen ActionHandler and perform processing on the send() function */
Ember.ActionHandler.reopen({
  send: function(actionName) {
    analyticsHandler.apply(this, arguments);
  }
});

export default App;
