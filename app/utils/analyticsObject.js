/**
 Analytics object definition - This holds all analytics specific data
*/
export default Ember.Object.create({
  // Default data to be passed on every request
  _: { site: "My Online Bank" },

  // Non route-based or global fallback actions
  _global: {
    _trackPromise: function(route, promiseStatus) { return { route: route, status: promiseStatus }; },
    _trackAbort: function(route, destination) { return { route: route, destination: destination }; },
    _trackExternalLink: function(url) { return { "external-url": url }; }
  },

  // Begin route-specific actions
  //   Where {{action "qux"}} in foo.bar is assigned as follows:
  //
  //     foo: { //Route name
  //       bar: {  //Leaf-most route name
  //         qux: { var: 'borf' } //Action name
  //       }
  //     }
  //
  // If the given analytics handler is a function, I can either pass in named parameters or, even better,
  // since I have access to the current route scope so I can grab any route-specific data for even more dynamic
  // analytics tracking.
  //
  // Also if the action is not explictly listed, there will be no tracking
  //
  login: {
    login: function() { return { action: "login", username: this.get('username') }; }
  },
  "one-time-password": {
    "select-delivery-method": {
      selectDeliveryMethod: function() { return { action: "select-delivery-method", deliveryMethodId: this.get('deliveryMethodId') }; }
    },
    authenticate: {
      authenticate: { action: "authenticate" }
    },
    "register-device": {
      registerDevice: function() { return { action: "register-device", "should-register-device": this.get('shouldRegisterBool') }; }
    }
  },
  transfers: {
    transferFunds: function() { return { action: "initiate-transfer-funds", from: this.get('selectedTransferFromAccount.name'), to: this.get('selectedTransferToAccount.name'), amount: this.get('transferAmount'), date: this.get('todayDate') }; }
  },
  accounts: {
    details: {
      vote: function(vote, color, product) { return { var3: vote, var4: color, var5: product }; }
    }
  }
});
