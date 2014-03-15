var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('authenticated', { path: '/' }, function() {
    this.route('accounts', { path: '/' });
  });
  this.route('login');
  this.route('logout');
});

export default Router;
