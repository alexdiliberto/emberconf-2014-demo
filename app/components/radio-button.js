export default Ember.Component.extend({
  attributeBindings: ["disabled", "type", "name", "value", "checked"],
  classNames: ["ember-radio-button"],

  /**
    The value of this radio button.

    @type Object
  */
  value: null,

  /**
    The selected value in this group of radio buttons.

    @type Object
  */
  selectedValue: null,

  /**
    Sets the disabled property on the element.

    @default false
    @type Boolean
  */
  isDisabled: false,

  /**
    Sets the checked property on the element.

    @default false
    @type Boolean
  */
  checked: false,

  tagName: "input",
  type: "radio",

  selectedValueChanged: Ember.observer(function() {
    var selectedValue = Ember.get(this, 'selectedValue');
    if(!Ember.isEmpty(selectedValue) && Ember.get(this, 'value') === selectedValue) {
      Ember.set(this, "checked", true);
    } else {
      Ember.set(this, "checked", false);
    }
  }, 'selectedValue'),

  checkedChanged: Ember.observer(function() {
    this._updateElementValue();
  }, 'checked'),

  init: function() {
    this._super();
    this.selectedValueChanged();
    this.on('change', this, this._change);
  },

  _change: function() {
    Ember.set(this, 'checked', this.$().prop('checked'));
    Ember.run.once(this, this._updateElementValue);
  },

  _updateElementValue: function() {
    if(!Ember.get(this, 'checked')) return;
    Ember.set(this, 'selectedValue', Ember.get(this, 'value'));
  }

});
