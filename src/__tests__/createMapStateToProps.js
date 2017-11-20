import createMapStateToProps from '../createMapStateToProps'

const reducerName = 'components'
const state = {
  [reducerName]: {
    'Component/1': {
      id: 1,
      type: 'label',
      name: 'Label Component'
    },
    'Component/2': {
      id: 2,
      type: 'input',
      name: 'Input Component'
    }
  }
}

test('should select the state on receiving a reducerName and identifier', () => {
  expect(createMapStateToProps(reducerName)(state, { id: 1 })).toEqual({
    id: 1,
    type: 'label',
    name: 'Label Component'
  })
})

test('should select state more precisely with the addition of a structured selector', () => {
  const nameProp = state => ({
    name: state.name
  })
  expect(
    createMapStateToProps(reducerName, undefined, nameProp)(state, { id: 2 })
  ).toEqual({
    name: 'Input Component'
  })
})
