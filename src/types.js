// @flow

type Identity = string
type ComponentName = string
type ComponentKey = string
type ReducerName = string
type ActionCreator<Action> = (...args: Array<any>) => Action

export type {
  ActionCreator,
  ComponentName,
  ComponentKey,
  ReducerName,
  Identity
}
