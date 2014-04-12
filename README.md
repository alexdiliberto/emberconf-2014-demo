emberconf-2014-demo
===================

A demo app for two EmberConf 2014 presentations:

- Alex DiLiberto - [Extending Ember with Analytics](http://alexdiliberto.com/talks/extending-ember-with-analytics/#/)
- Nathan Hammond - [Controlling Route Traversal with Flows](http://emberconf.com/schedule.html#hammond)

## Notes

This application is in a mostly functional state as a demo. Any individual commit may break it, but issues are typically quickly patched.

```bash
npm install -g bower
git clone https://github.com/stefanpenner/ember-cli
cd ember-cli
git checkout 0c9720a704fcfb18b919aaa43861a27cd62ce065

# This is the version of ember-cli you'll need to use until these changes are published.
./bin/ember server
```

- After checkout `bower install && npm install` to populate the vendor folder.
- Then deal with a few issues:
  - Update `emberconf-2014-demo/node_modules/broccoli-static-compiler/node_modules/broccoli-kitchen-sink-helpers/index.js` with one of the patches from https://github.com/joliss/broccoli-kitchen-sink-helpers/issues/3.
  - Manually remove the `readme.md` file from `vendor/accounting`

## Known Issues

This is an error, but it's safe and things work anyway thanks to the magic of require:
```
>> Errors found in module import statements
>> emberconf-2014-demo/utils/ic-ajax-fixtures: Cannot find module "ic-ajax"
```

## Temporary Build Fixes

If you get an error on `ember build` simliar to the following then, refer to [broccoli-merge-trees/pull/2](https://github.com/joliss/broccoli-merge-trees/pull/2) for a temporary fix:

```sh
Error: EEXIST, file already exists 'tmp/tree_merger-tmp_dest_dir-Gca7u4E2.tmp/license'`
```
