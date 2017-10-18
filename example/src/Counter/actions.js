import withActionIdentity from '../withActionIdentity'

export { init } from '../actions'

const prefix = 'Counter'

export const INCREMENT = `${prefix}/INCREMENT`

export const increment = withActionIdentity(() => ({ type: INCREMENT }))
