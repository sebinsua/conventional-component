import { withActionIdentity } from 'conventional-component'

const prefix = 'Counter'

export const INCREMENT = `${prefix}/INCREMENT`

export const increment = withActionIdentity(() => ({ type: INCREMENT }))
