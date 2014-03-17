var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  // Routes in authenticated space require full authentication.
  // "Top level" routes will be authenticated.
  this.resource('authenticated', { path: '/' }, function() {
    // Push the accounts route to be the "index"
    this.resource('accounts', { path: '/' });
    this.resource('transfer');
    this.resource('pay-bills');
    this.resource('statements');
    this.route('tour');
  });

  // Routes in login space require partial authentication.
  this.resource('login', function() {
    this.resource('one-time-password', function() {
      this.route('setup');
      this.route('delivery');
      this.route('authenticate');
      this.route('register-device');
    });
    this.route('terms-of-service');
    this.route('electronic-signature');
  });

  // Routes in public space require no authentication.
  this.route('logout');
  this.route('forgot-username');
  this.route('forgot-password');
  this.route('e-sign-do-not-accept');
});

export default Router;
