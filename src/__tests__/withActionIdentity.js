import withActionIdentity from '../withActionIdentity'

function testAction(arg1, arg2) {
  return {
    type: 'TEST',
    payload: {
      args: [arg1, arg2]
    }
  }
}

function testThunkProducingAction(arg1, arg2) {
  return dispatch => {
    return dispatch({
      type: 'TEST',
      payload: {
        args: [arg1, arg2]
      }
    })
  }
}

test('should produce identified actions when a wrapped action creator is called with an identity', () => {
  const action = withActionIdentity(testAction)
  const identity = 'Component/1'
  expect(action(identity, 'arg1', 'arg2')).toEqual({
    type: 'TEST',
    identity,
    payload: {
      args: ['arg1', 'arg2']
    }
  })
})

test('should produce unidentified actions when a wrapped action creator is called without an identity', () => {
  const action = withActionIdentity(testAction)
  expect(action(undefined, 'arg1', 'arg2')).toEqual({
    type: 'TEST',
    payload: {
      args: ['arg1', 'arg2']
    }
  })
})

test('should throw error when a wrapped action creator is called with an identity but was created from a thunk producing action', () => {
  const action = withActionIdentity(testThunkProducingAction)
  const identity = 'Component/1'
  expect(() => action(identity, 'arg1', 'arg2')).toThrow(
    'conventional-component#withActionIdentity only supports action creators which create action objects. If you need to support thunks, you must conform to the conventional-component Action and ActionCreator signatures manually.'
  )
})
