import { withActionIdentity } from 'conventional-component'

const prefix = 'StateControl'

export const SET_VALUE = `${prefix}/SET_VALUE`
export const PREVIOUS_VALUE = `${prefix}/PREVIOUS_VALUE`
export const NEXT_VALUE = `${prefix}/NEXT_VALUE`

export const setValue = withActionIdentity(value => ({
  type: SET_VALUE,
  payload: value
}))

export const previousValue = withActionIdentity(() => ({
  type: PREVIOUS_VALUE
}))

export const nextValue = withActionIdentity(() => ({
  type: NEXT_VALUE
}))
