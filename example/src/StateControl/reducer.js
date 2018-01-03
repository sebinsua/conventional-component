import { INIT, RECEIVE_NEXT_PROPS } from 'conventional-component'
import { SET_VALUE, PREVIOUS_VALUE, NEXT_VALUE } from './actions'

const REDUCER_NAME = 'StateControl'

const initialState = {
  availableStates: [],
  value: undefined
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        availableStates: action.payload.availableStates,
        value: action.payload.defaultValue
      }
    case RECEIVE_NEXT_PROPS:
      return {
        ...state,
        availableStates: action.payload.availableStates,
        value: action.payload.value
      }
    case PREVIOUS_VALUE: {
      const currentValue = state.value
      const currentStateIndex = state.availableStates.findIndex(
        state => state.value === currentValue
      )

      if (currentStateIndex > 0) {
        let previousSettableIndex = -1
        for (var idx = state.availableStates.length; idx >= 0; idx--) {
          if (
            idx < currentStateIndex &&
            state.availableStates[idx].settable !== false
          ) {
            previousSettableIndex = idx
            break
          }
        }

        if (previousSettableIndex !== -1) {
          const previousValue =
            state.availableStates[previousSettableIndex].value
          return { ...state, value: previousValue }
        }

        return state
      }

      return state
    }
    case NEXT_VALUE: {
      const currentValue = state.value
      const currentStateIndex = state.availableStates.findIndex(
        state => state.value === currentValue
      )

      if (currentStateIndex < state.availableStates.length - 1) {
        let nextSettableIndex = -1
        for (var idx = 0; idx < state.availableStates.length; idx++) {
          if (
            idx > currentStateIndex &&
            state.availableStates[idx].settable !== false
          ) {
            nextSettableIndex = idx
            break
          }
        }

        if (nextSettableIndex !== -1) {
          const nextValue = state.availableStates[nextSettableIndex].value
          return { ...state, value: nextValue }
        }

        return state
      }

      return state
    }
    case SET_VALUE:
      const value = action.payload
      const availableState = state.availableStates.find(
        state => state.value === value
      )

      if (availableState && availableState.settable !== false) {
        return { ...state, value: action.payload }
      }
      return state
    default:
      return state
  }
}

export { initialState, REDUCER_NAME }
export default reducer
