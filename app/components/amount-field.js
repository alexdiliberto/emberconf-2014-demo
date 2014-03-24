export default Ember.TextField.extend({
  focusOut: function() {
    this._formatValueToAmount();
  },
  insertNewline: function() {
    this._formatValueToAmount();
  },
  didInsertElement: function() {
    this._formatValueToAmount();
  },
  _formatValueToAmount: function() {
    var val = this.$().val(),
        formattedAmount;
    if(val) {
      val = (val + "").replace(/[^\d.]/g, "");
      formattedAmount = accounting.formatMoney(Number(val));
      this.$().val(formattedAmount);
      Ember.set(this, 'value', formattedAmount);
    }
  },
  keyDown: function(event) {
    var val              = this.get('value') + "",
        // Get cursor position inside text box
        cursorPosition   = this.$().prop('selectionStart'),
        // Get index of "."
        dotIndex         = val.indexOf('.'),
        // Get character at previous position
        previousChar     = val.charAt(cursorPosition - 1),
        // Get character at cursor position
        currentChar      = val.charAt(cursorPosition),
        // Check presence of "." in amount
        hasDot           = dotIndex !== -1,
        // Extract fraction part from amount
        fractionPart     = hasDot ? val.substring(dotIndex + 1) : "",
        // An amount without dot is considered as integer
        isTypingInteger  = hasDot ? cursorPosition <= dotIndex : true,
        // Only 2 digits are allowed after fraction
        isTypingFraction = hasDot ? cursorPosition > dotIndex && fractionPart.length < 2 : false,
        hasDollar        = val.indexOf('$') !== -1,
        canTypeComma;

    canTypeComma = isTypingInteger && // Commas are allowed in integer part only
      cursorPosition !== 0 && // Commas are not allowed at first position of an amount
      // Commas are not allowed to type continuously or not allowed after "$"
      !_.contains([',', '$'], previousChar) && currentChar !== ',';

    // Allow: backspace, delete, tab, escape, home, end, left, right and enter or (Ctrl + A)
    if(_.contains([46,8,9,27,13,35,36,37,38,39], event.keyCode) || (event.keyCode == 65 && event.ctrlKey) ||
      // Allow: Comma
      (event.keyCode === 188 && !event.shiftKey && canTypeComma) ||
      // Allow: Only one dot
      (event.keyCode === 190 && !event.shiftKey && !hasDot) ||
      // Allow: Only one dollar, dollar will be allowed only at first
      (event.keyCode === 52 && event.shiftKey && !hasDollar && cursorPosition === 0)) {
      return;
    }

    if(isTypingFraction || isTypingInteger) {
      // Prevent default if it is Shift or not a number
      if (!_.contains([48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105], event.keyCode) ||
        event.shiftKey) {
          event.preventDefault();
      }
    } else {
      event.preventDefault();
    }

  }
});
