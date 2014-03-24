export default Ember.Component.extend({
  tagName: ['a'],
  attributeBindings: ['download', 'href', 'hreflang', 'media', 'ping', 'rel', 'target', 'type'],
  action: '_trackExternalLink',
  _navigateToExternalLink: function(externalURL) {
    document.location = externalURL;
  },
  click: function(event) {
    // Stop normal link handling, while allowing propagation.
    event.preventDefault();

    // Preferring to capture state here based upon the user's action as opposed to the state
    // whenever Ember.run.later(); resolves.
    var url = this.get('href');

    // http://emberjs.com/guides/components/sending-actions-from-components-to-your-application/
    // this.sendAction() is the appropriate API to use for a component
    this.sendAction('action', url);

    // ...However, the following `this.triggerAction()` would work as well
    // To use this variation, simply update the analytics object "action name" to
    // accept a componentContext parameter for any dynamic data retrieval
    //  e.g.:_trackExternalLink: function(componentContext) { return { "external-url": componentContext.get('href') }; }
    // this.triggerAction({ action: '_trackExternalLink' });

    // For this example, I'm allowing 100ms for the analytics request to fire to prevent race
    // condition situations and follow generic community accepted patterns.
    // Please note: Certain analytics libraries have specific API calls to invoke external link
    // tracking, so this could easily be changed to suit your needs.
    //   e.g.: Google Analytics: https://support.google.com/analytics/answer/1136920?hl=en
    Ember.run.later(this._navigateToExternalLink, url, 100);
  }
});
