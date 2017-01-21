import {expect} from 'chai'
import Ember from 'ember'
const {Route} = Ember
import {beforeEach, describe, it} from 'mocha'

describe('Unit: Initializer | pollboy', function () {
  let route

  beforeEach(function () {
    route = Route.create()
  })

  it('has pollboy property', function () {
    expect(route.get('pollboy')).not.to.equal(undefined)
  })
})
