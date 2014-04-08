emberconf-2014-demo
===================

A demo app for two EmberConf 2014 presentations:

- Alex DiLiberto - [Extending Ember with Analytics](http://alexdiliberto.com/talks/extending-ember-with-analytics/#/)
- Nathan Hammond - [Controlling Route Traversal with Flows](http://emberconf.com/schedule.html#hammond)

## Notes

This application is in a mostly functional state as a demo. Any individual commit may break it, but issues are typically quickly patched.

```bash
npm install -g bower ember-cli@0.0.22
```

- After checkout `bower install && npm install` to populate the vendor folder.
- Then manually deal with a few issues:
  - https://github.com/joliss/broccoli-sass/pull/8
  - https://github.com/joliss/broccoli-kitchen-sink-helpers/issues/3
  - https://github.com/joliss/broccoli/pull/91
  - Manually remove the `readme.md` file from `vendor/accounting`
