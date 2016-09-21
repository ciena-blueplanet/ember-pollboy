import Ember from 'ember'
const {Service} = Ember

export const PollerMock = Ember.Object.extend({
  cancel () {},
  pause () {},
  poll () {},
  resume () {},
  schedule () {},
  start () {},
  stop () {}
})

export const serviceMock = Service.extend({
  add () {
    return PollerMock.create()
  },
  remove () {}
})

export function stubPollboy (application) {
  application.register('service:mockPollboy', serviceMock)
  application.inject('route', 'pollboy', 'service:mockPollboy')
}

export default {
  PollerMock,
  serviceMock,
  stubPollboy
}
