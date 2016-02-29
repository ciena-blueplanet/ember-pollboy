export function initialize (app) {
  app.inject('route', 'pollboy', 'service:pollboy')
}

export default {
  name: 'pollboy',
  initialize
}
