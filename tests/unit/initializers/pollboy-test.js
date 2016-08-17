import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

describe('Unit: Initializer | pollboy', function () {
  let route

  beforeEach(function () {
    route = Ember.Route.create()
  })

  it('has pollboy property', function () {
    expect(route.get('pollboy')).to.be.defined
  })
})
