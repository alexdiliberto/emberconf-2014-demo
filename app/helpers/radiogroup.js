// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

export default Ember.Handlebars.makeBoundHelper(function(options) {
  Ember.assert('You can only pass attributes to the `radiogroup` helper, not arguments', arguments.length < 2);
  return Ember.Handlebars.helpers.view.call(this, Ember.RadioButtonGroup, options);
});
