export default Ember.ArrayController.extend({
  selectedTransferFromAccount: undefined,
  selectedTransferToAccount: undefined,
  transferAmount: 0,
  hasSelectedBothAccounts: Ember.computed.and('selectedTransferFromAccount', 'selectedTransferToAccount'),
  hasSelectedBothAccountsAndNotComplete: Ember.computed.and('hasSelectedBothAccounts', 'transferNotComplete'),
  transferComplete: false,
  transferNotComplete: Ember.computed.not('transferComplete'),
  transferCompleteSuccess: undefined,
  transferCompleteMsg: undefined,
  loadingTransfer: false,
  todayDate: function() {
    var date = new Date(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      year = date.getFullYear();
    return month + "/" + day + "/" + year;
  }.property(),
});
