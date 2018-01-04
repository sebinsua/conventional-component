import { withActionIdentity } from 'conventional-component'

const prefix = 'StateControl'

export const SET_VALUE = `${prefix}/SET_VALUE`
export const HOVER_VALUE = `${prefix}/HOVER_VALUE`
export const PREVIOUS_VALUE = `${prefix}/PREVIOUS_VALUE`
export const NEXT_VALUE = `${prefix}/NEXT_VALUE`

export const setValue = withActionIdentity(value => ({
  type: SET_VALUE,
  payload: value
}))

export const hoverValue = withActionIdentity(value => ({
  type: HOVER_VALUE,
  payload: value
}))

export const previousValue = withActionIdentity((shouldSelect = false) => ({
  type: PREVIOUS_VALUE,
  payload: { shouldSelect }
}))

export const nextValue = withActionIdentity((shouldSelect = false) => ({
  type: NEXT_VALUE,
  payload: { shouldSelect }
}))
