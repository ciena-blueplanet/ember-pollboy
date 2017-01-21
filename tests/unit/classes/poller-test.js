import {expect} from 'chai'
import Ember from 'ember'
const {RSVP, run} = Ember
import Poller from 'ember-pollboy/classes/poller'
import {describe, it} from 'mocha'
import sinon from 'sinon'
function createPoller (callback) {
  const context = {}
  const interval = 120
  const poller = Poller.create({context, callback: () => {
    callback()
    poller.stop()
    return RSVP.Promise.resolve(true)
  }, interval})
  return poller
}

function endTest (testEnd) {
  run.later(testEnd, 300)
}

describe('Unit : Class | Poller', function () {
  it('polls at an interval', function (done) {
    const poller = createPoller(done)
    poller.start()
  })

  it('can stop polling', function (done) {
    const spy = sinon.spy()
    const poller = createPoller(spy)
    poller.start()
    endTest(() => {
      expect(spy.calledOnce).to.equal(true)
      done()
    })
  })

  it('can be paused', function (done) {
    const spy = sinon.spy()
    const poller = createPoller(spy)
    poller.start()
    poller.pause()
    endTest(() => {
      expect(spy.called).to.equal(false)
      poller.stop()
      done()
    })
  })

  it('can resume from being paused', function (done) {
    const spy = sinon.spy()
    const poller = createPoller(spy)
    poller.start()
    poller.pause()
    poller.resume()
    endTest(() => {
      expect(spy.called).to.equal(true)
      done()
    })
  })
})
