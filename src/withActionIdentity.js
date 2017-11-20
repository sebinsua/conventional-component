// @flow

import type { ActionCreator, Identity } from './types'

import getDisplayName from './getDisplayName'

type WithIdentity<Action> = { identity: Identity, ...Action }

function withActionIdentity<Action: { [key: string]: any }>(
  actionCreator: ActionCreator<Action>
) {
  function withIdentity(
    identity: Identity,
    ...args: Array<any>
  ): WithIdentity<Action> {
    const action = actionCreator(...args)
    if (identity) {
      if (typeof action !== 'object') {
        throw new Error(
          'conventional-component#withActionIdentity only supports action creators which create action objects. ' +
            'If you need to support thunks, you must conform to the conventional-component ' +
            'Action and ActionCreator signatures manually.'
        )
      }
      return { identity, ...action }
    }

    if (!identity) {
      return action
    }

    return { identity, ...action }
  }

  if (process.env.NODE_ENV !== 'production') {
    const actionCreatorName = getDisplayName(actionCreator, 'actionCreator')
    withIdentity.displayName = `withIdentity(${actionCreatorName})`
  }

  return withIdentity
}

export type { WithIdentity, Identity }
export default withActionIdentity
