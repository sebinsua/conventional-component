import withActionIdentity from '../withActionIdentity'

const prefix = 'Input'

export const SET_FOCUS = `${prefix}/SET_FOCUS`

export const setFocus = withActionIdentity(focus => ({
  type: SET_FOCUS,
  payload: focus
}))
