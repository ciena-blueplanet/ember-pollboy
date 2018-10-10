# 1.0.2 (2018-07-20)

* **Fixed** Travis API key.


# 1.0.1 (2018-03-08)
* **Updated** pull request template
* **Added** issue template
* **Updated** to `pr-bumper` version `3`
* **Updated** to node 8
* **Added** slack integration
* **Updated** `ember-frost-test` to `^4.0.1`
* **Updated** `ember-test-utils` to `^8.1.1`
* **Added** `package-lock.json` file

# 1.0.0 (2018-03-06)
* **Updated** test helpers to now be provided from addon-test-support. For example, test helpers previously available at `<app-name>/tests/helpers/ember-pollboy` are now available via `ember-pollboy/test-support/mock`
* **Updated** to add information to `README.md` about test helpers
* **Updated** `ember-test-utils` to `^8.1.0`
* **Updated** code coverage config to be in correct directory and added `json-summary` reporter 

# 0.8.1 (2018-01-03)

We experienced an issue with our release version strategy and version `0.8.0` should not have been released.  Unfortunately the release that should have been - `0.7.1` - was then released so this PR will release `0.8.1` to get everything back on track.

# 0.8.0 (2017-12-28)

We experienced an issue with our release version strategy and this release should not have occurred.  Unfortunately the release that should have (0.7.1) did then occur so we will now release version 0.8.1 to get everything back on track.

# 0.7.1 (2018-01-03)

* Remove _package-lock.json_ until officially support Node 8
* Pin `ember-cli-code-coverage@0.3.12`
* Remove useLintTree ember-cli-mocha config option
* Upgrade `ember-frost-test` to `^4.0.0`

# 0.7.0 (2017-11-17)

* Added FastBoot compatibility by confirming that document exists before referencing it.

# 0.6.4 (2017-11-17)
* Install `Bower` as a `devDependeny` in _package.json_ since it was removed in Ember CLI 2.12 and `ember-try` seems to have issues with that
* Pin `ember-cli-htmlbars-inline-precompile` to `0.3.12`

# 0.6.3 (2017-07-10)

Upgrade Ember-cli to 2.12.3


# 0.6.2 (2017-05-11)
* **Added** `.pr-bumper.json` file to restore publishing
* **Updated** secure auth tokens


# 0.6.1

* **Fixed** build to publish.

# 0.6.0

* **Added** pull request template for Github.
* **Updated** CI to test in Chrome as well as Firefox.


# 0.5.1

* **Upgraded** to test against Ember 2.11.


# 0.5.0

* **Added** additional builds to CI to make sure addon works with latest versions of Ember.
* **Removed** files from npm package that aren't necessary (all of the various config files).
* **Updated** dependencies to latest versions.


# 0.4.1

* **Fixes** memory leak

# 0.4.0

* **Added** new test helper, `stubPollboy`,  for acceptance tests that mocks the polling service to not actually poll (otherwise acceptance tests will never complete).
* **Replaced** `ember-cli-blanket` with `ember-cli-code-coverage` for test coverage.
* **Upgraded** `devDependencies` to latest versions.

# 0.3.2

* **Updated** Travis configuration to test addon against older versions of Ember.

# 0.3.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 0.3.0

* **Fixed** issues with polling state management where polling would continue after the `stop()` method was called.

# 0.2.2

* **Fixed** `onPoll()` method in README to return so it waits for the promise to resolve before attempting to poll again.

