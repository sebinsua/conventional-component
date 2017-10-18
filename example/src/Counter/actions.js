import { withActionIdentity } from 'conventional-component'

export { init } from 'conventional-component'

const prefix = 'Counter'

export const INCREMENT = `${prefix}/INCREMENT`

export const increment = withActionIdentity(() => ({ type: INCREMENT }))
