[ember-img]: https://img.shields.io/badge/ember-1.12.2+-green.svg "Ember 1.12.2+"
[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-pollboy.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-pollboy
[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-pollboy.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-pollboy
[npm-img]: https://img.shields.io/npm/v/ember-pollboy.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-pollboy

# ember-pollboy <br /> [![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url] ![Ember][ember-img]

This addon provides a polling service to make it easy to setup polling in Ember routes.
One of the benefits to using this service is that it only polls when the page is in view,
meaning when a user switches browser tabs, applications, or desktops the polling is paused.

## Installation

```bash
ember install ember-pollboy
```

## API

### Service

In a route you retrieve the service via `this.get('pollboy')`. Below is a list of available
methods on this service:

`add(context, callback, interval): Poller`

* *context* - The context in which to use for the callback function.
* *callback* - The callback function to call on each polling interval.
* *interval* - The interval in which to poll.

This function returns a new Poller instance.

`remove(poller): void`

* *poller* - The poller instance to remove. Note: poller will also be stopped before removal.

## Usage

Below is an example of a route that uses the `ember-pollboy` service to fetch a list
of users and update that list on a polling interval of 5 seconds.

```js
import Ember from 'ember'

export const pollInterval = 5000 // time in milliseconds

export default Ember.Route.extend({
  getUsers () {
    return this.get('store').findAll('user')
  },

  model () {
    return this.getUsers()
  },

  onPoll ()  {
    return this.getUsers()
      .then((users) => {
        this.set('currentModel', users)
      })
  },

  afterModel () {
    let usersPoller = this.get('usersPoller')

    // Make sure we only create one poller instance. Without this every time onPoll
    // is called afterModel would create a new poller causing us to have a growing list
    // of pollers all polling the same thing (which would result in more frequent polling).
    if (!usersPoller) {
      usersPoller = this.get('pollboy').add(this, this.onPoll, pollInterval)
      this.set('usersPoller', usersPoller)
    }
  },

  deactivate () {
    const usersPoller = this.get('usersPoller')
    this.get('pollboy').remove(usersPoller)
  }
})
```

In the above example you will notice after we retrieve the model we setup a polling
interval using `ember-pollboy`. When the route is deactivate we remove our poller from
the service to ensure polling stops when switching routes.

## Testing

Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

### Test Helpers


The following test helpers are provided at `ember-pollboy/test-support/mock` to assist with writing tests for code that uses `ember-pollboy`:

* [PollerMock](addon-test-support/mock.js)
* [serviceMock](addon-test-support/mock.js)
* [stubPollboy](addon-test-support/mock.js)

