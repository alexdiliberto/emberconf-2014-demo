export default Ember.Component.extend({
  classNames: ['ember-radio-button-group'],
  attributeBindings: ['name:data-name'],

  name: Ember.required(),
  /**
    The value of the selected radio button in this group

    @type Object
  */
  value: null,

  RadioButton: Ember.computed(function() {
    return Ember.RadioButton.extend({
      group: this,
      selectedValueBinding: 'group.value',
      nameBinding: 'group.name'
    });
  })
});
