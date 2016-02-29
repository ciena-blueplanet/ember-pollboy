import Ember from 'ember'

/**
 * @callback {Function} PollboyCallback
 * @returns {Ember.RSVP.Promise} Resolved when next polling interval should begin
 */

export const Poller = Ember.Object.extend({
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
    const timer = this.get('timer')
    Ember.run.cancel(timer)
  }
})

export default Ember.Service.extend({
  pollers: [],

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
