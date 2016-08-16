import Ember from 'ember'
const {run} = Ember

export default Ember.Object.extend({
  /**
   * Used to determine if poller is currently not polling (i.e. when tab is not visible)
   * @type {Boolean}
   */
  isPaused: false,
  /**
   * Schedule next poll interval
   * @returns {*} Timer information for use in cancelling, see `Ember.run.cancel`.
   */
  schedule () {
    // Don't schedule another poll if we're not polling
    if (this.get('isPaused') !== true) {
      const interval = this.get('interval')

      return run.later(
        this,
        this.poll,
        interval
      )
    }
  },

  /**
   * Cancel current polling interval
   */
  cancel () {
    const timer = this.get('timer')
    run.cancel(timer)
  },

  /**
   * Pause polling
   */
  pause () {
    this.set('isPaused', true)
    this.cancel()
  },

  /**
   * Poll immediately
   */
  poll () {
    const callback = this.get('callback')
    const context = this.get('context')

    this.cancel()

    callback.apply(context).then(() => {
      this.set('timer', this.schedule())
    })
  },

  /**
   * Resume polling if paused
   */
  resume () {
    const isPaused = this.get('isPaused')

    if (isPaused) {
      this.poll()
      this.set('isPaused', false)
    }
  },

  /**
   * Begin polling
   */
  start () {
    this.cancel() // Make sure no previous polling interval
    const timer = this.schedule()
    this.set('timer', timer)
  },

  /**
   * Stop polling
   */
  stop () {
    this.set('isPaused', true)
    this.cancel()
  }
})
