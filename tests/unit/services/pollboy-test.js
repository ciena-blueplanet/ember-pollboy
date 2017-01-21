import {expect} from 'chai'
import Ember from 'ember'
const {RSVP} = Ember
import Poller from 'ember-pollboy/classes/poller'
import Pollboy from 'ember-pollboy/services/pollboy'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const pollerMethods = [
  'cancel',
  'pause',
  'poll',
  'resume',
  'schedule',
  'start',
  'stop'
]

function stubObject (methods) {
  return methods.reduce((spyObj, methodName) => {
    spyObj[methodName] = sinon.spy()
    return spyObj
  }, {})
}

describe('Unit: Service | pollboy', function () {
  let sandbox, service, mockPoller

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    mockPoller = stubObject(pollerMethods)

    sandbox.stub(Poller, 'create').returns(mockPoller)

    service = Pollboy.create()
  })

  afterEach(function () {
    sandbox.restore()
    mockPoller = null
  })

  it('starts off with no poller instances', function () {
    expect(service.get('pollers')).to.eql([])
  })

  describe('.add()', function () {
    let callback, poller

    beforeEach(function () {
      callback = sandbox.spy(() => RSVP.resolve())
      poller = service.add(null, callback, 100)
    })

    afterEach(function () {
      service.remove(poller) // Make sure we stop polling after test is complete
    })

    it('starts new Poller instance', function () {
      expect(poller.start.callCount).to.equal(1)
    })

    it('adds new Poller instance to list of pollers', function () {
      expect(service.get('pollers')).to.eql([poller])
    })

    it('returns new instance of Poller class', function () {
      expect(poller).to.equal(mockPoller)
    })
  })

  describe('.onVisibilityChange()', function () {
    //
    let callback, pollList
    beforeEach(function () {
      pollList = [mockPoller]
      callback = sandbox.spy(() => RSVP.resolve())
      pollList.push(service.add(null, callback, 100))
      pollList.push(service.add(null, callback, 100))
      pollList.push(service.add(null, callback, 100))
    })
    afterEach(function () {
      pollList.forEach(function (poller) {
        service.remove(poller)
      })
    })

    it('pauses all pollers if the document is hidden', function () {
      service.onVisibilityChange({target: {hidden: true}})
      pollList.forEach(function (poller) {
        expect(poller.pause.called).to.equal(true)
        expect(poller.resume.called).to.equal(false)
      })
    })

    it('unpauses all pollers if the document is not hidden', function () {
      service.onVisibilityChange({target: {hidden: false}})
      pollList.forEach(function (poller) {
        expect(poller.resume.called).to.equal(true)
        expect(poller.pause.called).to.equal(false)
      })
    })
  })

  describe('.remove()', function () {
    //
    let poller, callback
    beforeEach(function () {
      callback = sandbox.spy(() => RSVP.resolve())
      poller = service.add(null, callback, 100)
      service.remove(poller)
    })
    it('removes a poller', function () {
      expect(service.get('pollers')).to.eql([])
    })
    it('cancels the polling of poller', function () {
      expect(mockPoller.cancel.called)
    })
  })
})
