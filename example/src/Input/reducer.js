import { SET_FOCUS, SET_VALUE } from './actions'

const initialState = {
  hasFocus: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOCUS:
      return { ...state, hasFocus: action.payload }
    case SET_VALUE:
      return { ...state, value: action.payload }
    default:
      return state
  }
}

export default reducer
