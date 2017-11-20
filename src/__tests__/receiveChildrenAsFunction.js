import receiveChildrenAsFunction from '../receiveChildrenAsFunction'

test('should call props.children() with the remaining props', () => {
  const remainingProps = {
    a: 4,
    b: 5,
    c: 6
  }
  const props = {
    children: jest.fn(),
    ...remainingProps
  }

  receiveChildrenAsFunction(props)

  expect(props.children).toHaveBeenCalledWith(remainingProps)
})
