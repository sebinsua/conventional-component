import withActionIdentity from '../withActionIdentity'

const prefix = 'Counter'

export const INCREMENT = `${prefix}/INCREMENT`

export const increment = withActionIdentity(() => ({ type: INCREMENT }))
