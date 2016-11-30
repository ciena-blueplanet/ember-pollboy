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

