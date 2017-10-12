import withActionIdentity from '../withActionIdentity'

export const INCREMENT = 'counter/INCREMENT'

export const increment = withActionIdentity(() => ({ type: INCREMENT }))
