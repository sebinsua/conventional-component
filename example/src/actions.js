import withActionIdentity from './withActionIdentity'

const prefix = 'conventional-component'

export const INIT = `${prefix}/INIT`

export const init = withActionIdentity((props = {}) => ({
  type: INIT,
  payload: props
}))
