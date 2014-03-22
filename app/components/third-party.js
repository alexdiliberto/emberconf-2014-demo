export default Ember.Component.extend({
  tagName: ['a'],
  attributeBindings: ['href'],
  _navigateToExternalLink: function() {
    document.location = this.get('href');
  },
  click: function(event) {
    event.preventDefault();
    Ember.run.later(this, this._navigateToExternalLink, 100);
  }
});
