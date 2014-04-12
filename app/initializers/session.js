import session from 'emberconf-2014-demo/utils/session';

export default {
  name: 'session',
  initialize: function(container, app) {
    container.register('session:main', session);
    app.inject('route', 'session', 'session:main');
  }
}
