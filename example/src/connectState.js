import { compose, withReducer, mapProps, withPropsOnChange } from 'recompose'

const bindActionCreator = dispatch => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(...args))
  fn.displayName =
    actionCreator.displayName ||
    actionCreator.name ||
    'AnonymousBoundActionCreator'
  return fn
}

const bindActionCreators = (actions = {}, dispatch) => {
  const bind = bindActionCreator(dispatch)
  const actionCreatorKeys = Object.keys(actions)
  return actionCreatorKeys.reduce((boundActionCreators, actionCreatorKey) => {
    const boundActionCreator = bind(actions[actionCreatorKey])
    return {
      ...boundActionCreators,
      [actionCreatorKey]: boundActionCreator
    }
  }, {})
}

const STATE_NAME = '__state'
const DISPATCH_NAME = 'dispatch'

const omitState = mapProps(props => {
  const newProps = Object.assign({}, props)
  delete newProps[STATE_NAME]
  return newProps
})

const connectState = (reducer, actionCreators) =>
  compose(
    withReducer(STATE_NAME, DISPATCH_NAME, reducer),
    withPropsOnChange([STATE_NAME, DISPATCH_NAME], props => ({
      ...props[STATE_NAME],
      ...bindActionCreators(actionCreators, props[DISPATCH_NAME])
    })),
    omitState
  )

export default connectState
