export default Ember.Component.extend({
  tagName: ['a'],
  attributeBindings: ['href'],
  action: '_trackExternalLink',
  _navigateToExternalLink: function(externalURL) {
    document.location = externalURL;
  },
  click: function(event) {
    // For this example, I'm allowing 100ms for the analytics request to fire to prevent race
    // condition situations and follow generic community accepted patterns.
    // Please note: Certain analytics libraries have specific API calls to invoke exteral link
    // tracking, so this could easily be changed to suit your needs.
    //   e.g.: Google Analytics: https://support.google.com/analytics/answer/1136920?hl=en
    event.preventDefault();
    var url = this.get('href');

    // http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/
    // this.sendAction() is the appropriate API to use for a component
    this.sendAction('action', url);

    // ...However, the following `this.triggerAction()` would work as well
    // To use this variation, simply update the analytics object "action name" to
    // accept a componentContext paramter for any dynamic data retrieval
    //  e.g.:_trackExternalLink: function(componentContext) { return { "external-url": componentContext.get('href') }; }
    //this.triggerAction({ action: '_trackExternalLink' });

    Ember.run.later(this, this._navigateToExternalLink, url, 100);
  }
});
