import analyticsObject from 'emberconf-2014-demo/utils/analyticsObject';
import analyticsSendHandlers from 'emberconf-2014-demo/utils/analyticsSendHandlers';

export default function analyticsHandler(actionName) {
  /* Get router handle by scope (different: send versus action) */
  var target = this.target;
  var router = target ? target.router : this.router.router;

  if (!router) {
    this._super.apply(this, arguments);
    return;
  }

  /* If there is a currently active transition, grab the target name */
  var activeTransition = router.activeTransition && router.activeTransition.targetName;

  /* Get the active leaf-most route name */
  var curHandlerInfos = router.currentHandlerInfos;
  var activeLeafMostRoute = curHandlerInfos[curHandlerInfos.length - 1].name;

  /**
   Fetch the correct analytics route handler object from the lookup table based on the following, in order:
    1. If currently transitioning to a route, get that new route's handler
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
  var trackobject = analyticsObject.get(routeName+'.'+actionName) || analyticsObject.get(routeName.replace('.index','')+'.'+actionName) || analyticsObject.get('_global.'+actionName);

  /* Route handlers can be simple objects or functions, if function then apply the supplied arguments */
  if (typeof trackobject == 'function') {
    trackobject = trackobject.apply(this, [].slice.call(arguments, 1)); // "shift" arguments array to pop off the first argument (action name)
  }

  /* Merge the route handler with the variables sent on every route then send fire the analytics action handler */
  if (trackobject) {
    analyticsSendHandlers.action(Ember.Object.create(analyticsObject.get('_'), trackobject));
  }

  /* Skip the default action handling on simple tracking */
  if (actionName.indexOf('_track') !== 0) {
    this._super.apply(this, arguments);
  }
};
