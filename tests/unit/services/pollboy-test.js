import {expect} from 'chai'
import Ember from 'ember'
const {RSVP} = Ember
import Poller from 'ember-pollboy/classes/poller'
import Pollboy from 'ember-pollboy/services/pollboy'
import {afterEach, beforeEach, describe, it} from 'mocha'
import {describeModule} from 'ember-mocha'
import sinon from 'sinon'

describe('Unit: Service | pollboy', function () {
  let sandbox, service

  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    ;[
      'cancel',
      'pause',
      'poll',
      'resume',
      'schedule',
      'start',
      'stop'
    ]
      .forEach((method) => {
        const a = Poller
        debugger
        sandbox.spy(a.prototype, method)
      })

    service = Pollboy.create()
  })

  afterEach(function () {
    sandbox.restore()
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
      debugger
      expect(poller.start.callCount).to.equal(1)
    })

    it('adds new Poller instance to list of pollers', function () {
      expect(service.get('pollers')).to.eql([poller])
    })

    it('returns new instance of Poller class', function () {
      expect(poller instanceof Poller).to.be.true
    })
  })

  describe('.onVisibilityChange()', function () {
    //
  })

  describe('.remove()', function () {
    //
  })
})

function createPoller (callback) {
  const context = {}
  const interval = 120
  const poller = Poller.create({context, callback: () => {
    callback()
    poller.stop()
    return Ember.RSVP.Promise.resolve(true)
  }, interval})
  return poller
}

function endTest (testEnd) {
  Ember.run.later(testEnd, 300)
}

describeModule(
  'service:pollboy',
  'Unit : pollboy Poller',
  {
    unit: true
  },
  function () {
    it('polls at an interval', function (done) {
      const poller = createPoller(done)
      poller.start()
    })

    it('can stop polling', function (done) {
      const spy = sinon.spy()
      const poller = createPoller(spy)
      poller.start()
      endTest(() => {
        expect(spy.calledOnce).to.be.true
        done()
      })
    })

    it('can be paused', function (done) {
      const spy = sinon.spy()
      const poller = createPoller(spy)
      poller.start()
      poller.pause()
      endTest(() => {
        expect(spy.called).to.be.false
        poller.stop()
        done()
      })
    })

    it('can resume from being paused', function (done) {
      const spy = sinon.spy()
      const poller = createPoller(spy)
      poller.start()
      poller.pause()
      endTest(() => {
        expect(spy.called).to.be.true
        done()
      })
    })
  }
)
