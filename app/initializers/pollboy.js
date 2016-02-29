export function initialize (container, app) {
  app.inject('route', 'pollboy', 'service:pollboy')
}

export default {
  name: 'pollboy',
  initialize
}
