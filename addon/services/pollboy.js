import Ember from 'ember'
const {Service} = Ember
import Poller from '../classes/poller'

/**
 * @callback {Function} PollboyCallback
 * @returns {Ember.RSVP.Promise} Resolved when next polling interval should begin
 */

export default Service.extend({
  pollers: [],

  init () {
    this._super()
    this._onVisibilityChangeHandler = this.onVisibilityChange.bind(this)
    document.addEventListener('visibilitychange', this._onVisibilityChangeHandler, false)
  },

  willDestroy () {
    document.removeEventListener('visibilitychange', this._onVisibilityChangeHandler)
  },

  /**
   * Pause/resume polling based on whether or not page is currently visible to user.
   * When user switches browser tabs polling will stop.
   * When user switches applications polling will stop.
   * When page comes back into focus any pollers that were stopped due to loss of page focus will resume.
   * @param {Event} event - visibilitychange event data
   */
  onVisibilityChange (event) {
    const pollers = this.get('pollers')

    // If page is no longer visible pause pollers
    if (event.target.hidden) {
      pollers.forEach((poller) => {
        poller.pause()
      })

      return
    }

    // If page has become visible make sure to resume pollers that were previously paused
    pollers.forEach((poller) => {
      poller.resume()
    })
  },

  /**
   * Add new polling item
   * @param {Object} context - context to be provided to callback
   * @param {PollboyCallback} callback - callback function for each poll interval
   * @param {Number} interval - number of milliseconds between polls
   * @returns {Poller} poller instance
   */
  add (context, callback, interval) {
    const poller = Poller.create({
      callback,
      context,
      interval
    })

    poller.start()

    this.get('pollers').push(poller)

    return poller
  },

  /**
   * Remove poller
   * @param {Poller} poller - Poller to remove
   */
  remove (poller) {
    poller.stop() // Make sure poller is no longer polling

    const pollers = this.get('pollers')
    const index = pollers.indexOf(poller)

    if (index !== -1) {
      pollers.splice(index, 1)
    }
  }
})
