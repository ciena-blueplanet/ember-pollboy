const expect = chai.expect

import {beforeEach, describe, it} from 'mocha'

describe('pollboy initializer', function () {
  let route

  beforeEach(function () {
    route = Ember.Route.create()
  })

  it('has pollboy property', function () {
    expect(route.get('pollboy')).to.be.defined
  })
})
