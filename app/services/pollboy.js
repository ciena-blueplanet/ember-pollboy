import Ember from 'ember'

/**
 * @callback {Function} PollboyCallback
 * @returns {Ember.RSVP.Promise} Resolved when next polling interval should begin
 */

export const Poller = Ember.Object.extend({
  /**
   * Used to determine if poller is currently paused (i.e. when tab is not visible)
   * @type {Boolean}
   */
  isPaused: false,

  /**
   * Schedule next poll interval
   * @returns {*} Timer information for use in cancelling, see `Ember.run.cancel`.
   */
  schedule () {
    const callback = this.get('callback')
    const context = this.get('context')
    const interval = this.get('interval')

    return Ember.run.later(
      this,
      function () {
        callback.apply(context).then(() => {
          this.set('timer', this.schedule())
        })
      },
      interval
    )
  },

  /**
   * Pause polling
   */
  pause () {
    this.set('isPaused', true)
    const timer = this.get('timer')
    Ember.run.cancel(timer)
  },

  /**
   * Resume polling if paused
   */
  resume () {
    const isPaused = this.get('isPaused')

    if (isPaused) {
      this.start()
    }
  },

  /**
   * Begin polling
   */
  start () {
    const timer = this.schedule()
    this.set('timer', timer)
  },

  /**
   * Stop polling
   */
  stop () {
    this.set('isPaused', false)
    const timer = this.get('timer')
    Ember.run.cancel(timer)
  }
})

export default Ember.Service.extend({
  pollers: [],

  init () {
    this._super()
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this), false)
  },

  /**
   * Pause/resume polling based on whether or not page is currently visible to user.
   * When user switches browser tabs polling will stop.
   * When user switches applications polling will stop.
   * When page comes back into focus any pollers that were stopped due to loss of page focus will resume.
   */
  onVisibilityChange () {
    const pollers = this.get('pollers')

    // If page is no longer visible pause pollers
    if (document.hidden) {
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

    this.get('pollers').pushObject(poller)

    return poller
  },

  /**
   * Remove poller
   * @param {Poller} poller - Poller to remove
   */
  remove (poller) {
    poller.stop() // Make sure poller is no longer polling
    this.get('pollers').removeObject(poller)
  }
})
