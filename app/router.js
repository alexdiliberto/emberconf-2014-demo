var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  // Routes in authenticated space require full authentication.
  // "Top level" routes will be authenticated.
  this.resource('authenticated', { path: '/' }, function() {
    // Push the accounts route to be the "index"
    this.route('accounts', { path: '/' });
    this.route('tour');
  });

  // Routes in login space require partial authentication.
  this.resource('login', function() {
    this.resource('one-time-password', function() {
      this.route('delivery');
      this.route('authenticate');
      this.route('setup');
    });
    this.route('terms-of-service');
    this.route('electronic-signature');
  });

  // Routes in public space require no authentication.
  this.route('logout');
  this.route('forgot-username');
  this.route('forgot-password');
});

export default Router;
