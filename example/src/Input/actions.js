import withActionIdentity from '../withActionIdentity'

export const SET_FOCUS = 'input/SET_FOCUS'

export const setFocus = withActionIdentity(focus => ({
  type: SET_FOCUS,
  payload: focus
}))
