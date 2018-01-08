import withRenderProp from '../withRenderProp'

test('should call props.render() with the remaining props', () => {
  const remainingProps = {
    a: 4,
    b: 5,
    c: 6
  }
  const props = {
    render: jest.fn(),
    ...remainingProps
  }

  withRenderProp(props)

  expect(props.render).toHaveBeenCalledWith(remainingProps)
})

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

  withRenderProp(props)

  expect(props.children).toHaveBeenCalledWith(remainingProps)
})
