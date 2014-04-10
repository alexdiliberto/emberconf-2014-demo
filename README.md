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

## Issues

If you get an error on `ember build` simliar to the following then, refer to [broccoli-merge-trees/pull/2](https://github.com/joliss/broccoli-merge-trees/pull/2) for a temporary fix:

`Error: EEXIST, file already exists 'tmp/tree_merger-tmp_dest_dir-Gca7u4E2.tmp/license'`

Updated the app.scss file to remove the `normalize` dependecy due to the following error:

`Error: /Applications/MAMP/htdocs/emberconf-2014-demo/tmp/template_filter-tmp_dest_dir-4MauhBLC.tmp/emberconf-2014-demo/styles/app.scss:6: error: file to import not found or unreadable: 'normalize'
 [string exception]`
