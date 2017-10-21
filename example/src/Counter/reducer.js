import { INCREMENT } from './actions'

const REDUCER_NAME = 'counters'

const initialState = {
  count: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}

export { initialState, REDUCER_NAME }
export default reducer
