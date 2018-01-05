// @flow

const withRenderProp = <
  Props: { render: Function, children: Function, [key: string]: any }
>({
  render,
  children,
  ...props
}: Props) => (render ? render(props) : children(props))

export default withRenderProp
