import withActionIdentity from '../withActionIdentity'

const prefix = 'Input'

export const SET_FOCUS = `${prefix}/SET_FOCUS`
export const SET_VALUE = `${prefix}/SET_VALUE`

export const setFocus = withActionIdentity((focus = true) => ({
  type: SET_FOCUS,
  payload: focus
}))

export const setValue = withActionIdentity((value = '') => ({
  type: SET_VALUE,
  payload: value
}))
