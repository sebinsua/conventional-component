import {
  init,
  receiveNextProps,
  destroy,
  INIT,
  RECEIVE_NEXT_PROPS,
  DESTROY
} from '../actions'

const identity = 'identity'
const props = {}

describe('init()', () => {
  it('should create an Init action', () => {
    expect(init(identity, props)).toEqual({
      type: INIT,
      identity: identity,
      payload: props
    })
  })
})

describe('receiveNextProps()', () => {
  it('should create a NextProps action', () => {
    expect(receiveNextProps(identity, props)).toEqual({
      type: RECEIVE_NEXT_PROPS,
      identity: identity,
      payload: props
    })
  })
})

describe('destroy()', () => {
  it('should create a Destroy action', () => {
    expect(destroy(identity)).toEqual({
      type: DESTROY,
      identity: identity
    })
  })
})
