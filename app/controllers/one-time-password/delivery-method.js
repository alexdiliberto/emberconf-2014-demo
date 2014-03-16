export default Ember.ObjectController.extend({
  htmlid: function() {
    return 'deliverymethod' + this.get('id');
  }.property('id')
});
