import { test , moduleForComponent } from 'emberconf-2014-demo/tests/helpers/module_for';

moduleForComponent('template-less');

test("template", function(){
  var component = this.subject();
  ok(this.$());
});
