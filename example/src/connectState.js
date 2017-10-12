import { compose, withReducer, mapProps, withPropsOnChange } from 'recompose'
import getDisplayName from './getDisplayName'

const bindActionCreator = (dispatch, identity) => actionCreator => {
  const fn = (...args) => dispatch(actionCreator(identity, ...args))
  fn.displayName =
    actionCreator.displayName ||
    actionCreator.name ||
    'AnonymousBoundActionCreator'
  return fn
}

const bindActionCreators = (actions = {}, dispatch, identity) => {
  const bind = bindActionCreator(dispatch, identity)
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

const defaultIdentifier = ({ id }) => id

const connectState = (
  reducer,
  actionCreators,
  identitifier = defaultIdentifier
) => {
  const enhance = Component =>
    compose(
      withReducer(STATE_NAME, DISPATCH_NAME, reducer),
      withPropsOnChange([STATE_NAME, DISPATCH_NAME], props => ({
        ...props[STATE_NAME],
        ...bindActionCreators(
          actionCreators,
          props[DISPATCH_NAME],
          `${getDisplayName(Component, 'Component')}/${identitifier(props)}`
        )
      })),
      omitState
    )(Component)

  return enhance
}

export default connectState
