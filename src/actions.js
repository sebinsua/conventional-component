import withActionIdentity from './withActionIdentity'

const prefix = 'conventional-component'

export const INIT = `${prefix}/INIT`
export const RECEIVE_NEXT_PROPS = `${prefix}/RECEIVE_NEXT_PROPS`
export const DESTROY = `${prefix}/DESTROY`

export const init = withActionIdentity((props = {}) => ({
  type: INIT,
  payload: props
}))

export const receiveNextProps = withActionIdentity((props = {}) => ({
  type: RECEIVE_NEXT_PROPS,
  payload: props
}))

export const destroy = withActionIdentity((props = {}) => ({
  type: DESTROY
}))
