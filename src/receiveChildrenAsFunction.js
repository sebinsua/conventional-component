// @flow

const receiveChildrenAsFunction = <
  Props: { children: Function, [key: string]: any }
>({
  children,
  ...props
}: Props) => children(props)

export default receiveChildrenAsFunction
