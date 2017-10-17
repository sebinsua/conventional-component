import { compose, withReducer, mapProps, withPropsOnChange } from 'recompose'
import getDisplayName from './getDisplayName'

const bindActionCreator = dispatch => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(undefined, ...args))

  fn.displayName = getDisplayName(actionCreator, 'AnonymousBoundActionCreator')

  return fn
}

const bindActionCreators = (actions = {}, dispatch) => {
  const bind = bindActionCreator(dispatch)
  const actionCreatorKeys = Object.keys(actions).filter(
    actionCreatorKey => typeof actions[actionCreatorKey] === 'function'
  )
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

const connectState = (reducer, actionCreators) => {
  const enhance = Component =>
    compose(
      withReducer(STATE_NAME, DISPATCH_NAME, reducer),
      withPropsOnChange([STATE_NAME, DISPATCH_NAME], props => ({
        ...props[STATE_NAME],
        ...bindActionCreators(actionCreators, props[DISPATCH_NAME])
      })),
      omitState
    )(Component)

  return enhance
}

export default connectState
