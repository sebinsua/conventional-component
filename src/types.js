type Identity = string
type ComponentName = string
type ActionCreator<Action> = (...args: Array<any>) => Action

export type { ActionCreator, Identity }
