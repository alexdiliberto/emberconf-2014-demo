/**
 Analytics object definition - This holds all analytics specific data
*/
export default Ember.Object.create({
  // Default information to be passed on every request
  _: { var1: true, var2: false },

  // Non route-based or global fallback actions
  _global: {
    _trackPromise: function(route, status) { return { var3: route, var4: status }; } // You may set the processor to be a function and return a POJO.
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
  // ...If the action is not explictly listed, there will be no tracking
  //
  login: {
    login: function(user) { return { var3: "login", var4: user }; }
  },
  products: {
    product: {
      vote: function(vote, color, product) { return { var3: vote, var4: color, var5: product }; },
      otherStuff: { var3: 'other-stuff' }
    }
  }
});
