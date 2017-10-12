import { SET_FOCUS } from './actions'

const initialState = {
  hasFocus: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOCUS:
      return { ...state, hasFocus: action.payload }
    default:
      return state
  }
}

export default reducer
