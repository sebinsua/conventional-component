// @flow

import type { Identity, ActionCreator } from './types'
import type { WithIdentity } from './withActionIdentity'

import withActionIdentity from './withActionIdentity'

type Props = { [prop: string]: ?any }

type Action<T: string, P> = {
  type: T,
  payload?: P
}
type Init = Action<'conventional-component/INIT', Props>
type NextProps = Action<'conventional-component/RECEIVE_NEXT_PROPS', Props>

type Destroy = Action<'conventional-component/DESTROY', void>
type LifecycleActions = Init | NextProps | Destroy

const INIT = 'conventional-component/INIT'
const RECEIVE_NEXT_PROPS = 'conventional-component/RECEIVE_NEXT_PROPS'
const DESTROY = 'conventional-component/DESTROY'

const init = withActionIdentity((props = {}): Init => ({
  type: INIT,
  payload: props
}))

const receiveNextProps = withActionIdentity((props = {}): NextProps => ({
  type: RECEIVE_NEXT_PROPS,
  payload: props
}))

const destroy = withActionIdentity((props = {}): Destroy => ({
  type: DESTROY
}))

export type { Action, Props, Init, NextProps, Destroy, LifecycleActions }
export { INIT, RECEIVE_NEXT_PROPS, DESTROY, init, receiveNextProps, destroy }
