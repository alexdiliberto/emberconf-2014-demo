var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({
  location: 'history'
});

Router.map(function() {
  // Routes in authenticated space require full authentication.
  // "Top level" routes will be authenticated.
  this.resource('authenticated', { path: '/' }, function() {
    // Push the accounts route to be the "index"
    this.resource('accounts', { path: '/' }, function() {
      this.route('details', { path : 'account/:account_id' });
    });
    this.resource('transfers', function() {});
    this.resource('statements', function() {});
    this.route('tour');
  });

  // Routes in login space require partial authentication.
  this.resource('login', function() {
    this.resource('one-time-password', function() {
      this.route('setup');
      this.route('select-delivery-method');
      this.route('authenticate');
      this.route('register-device');
    });
    this.route('electronic-consent');
    this.route('terms-of-service-consent');
    this.route('reset-password');
    this.route('complete');
  });

  // Routes in public space require no authentication.
  this.route('logout');
  this.route('recover-username');
  this.route('recover-password');

  this.route('contact');
});

export default Router;
