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

        acct = model.filter(function(account) { return account.id == transferFrom.id; })[0];
        acct.decrementProperty('amount', parseFloat(transferAmount));
        acct = model.filter(function(account) { return account.id == transferTo.id; })[0];
        acct.incrementProperty('amount', parseFloat(transferAmount));

        resolve({ from: transferFrom.name, to: transferTo.name, amt: transferAmount, date: transferDate });
      }, 2000);
    }.bind(this));
  },
  _resetState: function() {
    this.controller.setProperties({
      selectedTransferFromAccount: undefined,
      selectedTransferToAccount: undefined,
      transferAmount: undefined,
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
