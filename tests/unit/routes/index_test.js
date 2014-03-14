import { test , moduleFor } from 'emberconf-2014-demo/tests/helpers/module_for';

import Index from 'emberconf-2014-demo/routes/index';

moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  ok(this.subject() instanceof Index);
});

test("#model", function(){
  deepEqual(this.subject().model(), ['red', 'yellow', 'blue']);
});
