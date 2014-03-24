export default Ember.Route.extend({
  beforeModel: function() {
    if(!this.modelFor('accounts')) {
      this.replaceWith('accounts');
    }
  },
  model: function() {
    return this.modelFor('accounts');
  },
  _initiateTransfer: function() {
    var controller = this.controller,
      transferFrom = controller.get('selectedTransferFromAccount'),
      transferTo = controller.get('selectedTransferToAccount'),
      transferAmount = controller.get('transferAmount'),
      transferDate = controller.get('todayDate');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      var model = this.modelFor('accounts'),
        acct;

      controller.toggleProperty('loadingTransfer');

      Ember.run.later(this, function() {
        controller.toggleProperty('loadingTransfer');
        transferAmount = accounting.parse(transferAmount);

        acct = model.filter(function(account) { return account.id == transferFrom.id; })[0];
        // if(transferAmount > acct.amount) {
        //   controller.set('transferCompleteMsg', accounting.formatMoney(transferAmount)+' exceeds your '+accounting.formatMoney(acct.amount)+' '+acct.name+' account balance.');
        //   reject( { msg: controller.get('transferCompleteMsg') } );
        // }
        acct.decrementProperty('amount', transferAmount);
        acct = model.filter(function(account) { return account.id == transferTo.id; })[0];
        acct.incrementProperty('amount', transferAmount);

        resolve({ from: transferFrom.name, to: transferTo.name, amt: transferAmount, date: transferDate });
      }, 2000);
    }.bind(this));
  },
  _resetState: function() {
    this.controller.setProperties({
      selectedTransferFromAccount: undefined,
      selectedTransferToAccount: undefined,
      transferAmount: 0,
      transferComplete: false,
      transferCompleteSuccess: undefined,
      transferCompleteMsg: undefined
    });
  },
  actions: {
    transferFunds: function() {
      this._initiateTransfer().then(function(transfer) {
        this.send('_trackAppEvent', '_trackPromise', 'transfers#transferFunds', 'resolve');
        this.controller.setProperties({
          selectedTransferFromAccount: undefined,
          selectedTransferToAccount: undefined,
          transferComplete: true,
          transferCompleteSuccess: true,
          transferCompleteMsg: "Success! Your $"+transfer.amt+" transfer from "+transfer.from+" to "+transfer.to+" on "+transfer.date+" is complete."
        }, function(error) {
          console.log("error rejected: " + error);
        });
      }.bind(this));
    },
    willTransition: function(transition) {
      if (this.controller.get('hasSelectedBothAccountsAndNotComplete')) {
        if (window.confirm("You're in the middle of a transfer! Do you really want to leave?")) {
          this.send('_trackAppEvent', '_trackAbort', 'transfers', transition.targetName);
          this._resetState();
        } else {
          transition.abort();
        }
      } else if (this.controller.get('transferComplete')) {
        this._resetState();
      }
    }
  }
});
