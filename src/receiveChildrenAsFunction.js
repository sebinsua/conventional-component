const receiveChildrenAsFunction = ({ children, ...props }) => children(props)

export default receiveChildrenAsFunction
