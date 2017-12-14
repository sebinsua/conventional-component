import { ComponentType, Node } from 'react'

type KeyValueObject = { [key: string]: any }
type Props = { [prop: string]: any | undefined }

type Action<T, P> = {
  type: T,
  payload?: P
}

declare var INIT: 'conventional-component/INIT'
declare var RECEIVE_NEXT_PROPS: 'conventional-component/RECEIVE_NEXT_PROPS'
declare var DESTROY: 'conventional-component/DESTROY'

type Init = Action<typeof INIT, Props>
type NextProps = Action<typeof RECEIVE_NEXT_PROPS, Props>
type Destroy = Action<typeof DESTROY, void>
type LifecycleActions = Init | NextProps | Destroy

type ActionCreator<Action> = (...args: Array<any>) => Action

type Identity = string
type WithIdentity<Action> = { identity: Identity } & Action

interface WithIdentityState<ReducerState> {
  // @ts-ignore: mountedIdentities is erroring...
  mountedIdentities: Array<string>;
  [key: string]: ReducerState | undefined;
}

type IdentifierProps = { [key: string]: any }
type Identifier = (props: IdentifierProps) => string

type IdentifierPredicate = (identity: Identity) => boolean

type Reducer<ReducerState, Actions> = (
  state: ReducerState,
  action: Actions
) => ReducerState

type ComponentActions<A> = { [actionCreatorKey: string]: ActionCreator<A> }
type InitialState = { [key: string]: any }

interface LifecyleStateConfiguration {
  shouldDispatchReceiveNextProps: boolean;
}

interface WithLifecycleStateLogicProps {
  init: ActionCreator<WithIdentity<Init>>;
  receiveNextProps: ActionCreator<WithIdentity<NextProps>>;
  destroy: ActionCreator<WithIdentity<Destroy>>;
}

declare var init: WithIdentity<Init>
declare var receiveNextProps: WithIdentity<NextProps>
declare var destroy: WithIdentity<Destroy>

declare function connectToState<S, OP, A>(
  reducer: Reducer<S, OP>,
  actionCreators: ComponentActions<A>,
  initialState: InitialState | void
): <P>(BaseComponent: ComponentType<P>) => ComponentType<P>

type ConventionalActionCreators = {
  [actionName: string]: ActionCreator<LifecycleActions | Action<string, any>>
}
type WithLogic = <CTP>(
  TemplateComponent: ComponentType<CTP>
) => ComponentType<CTP>
type ComponentName = string
type ComponentKey = string
type ReducerName = string

interface ConventionalConfig {
  actions: ConventionalActionCreators;
  withLogic: WithLogic;
  Template: ComponentType<any>;
  reducer: Reducer<any, any>;
  REDUCER_NAME?: ReducerName;
  COMPONENT_NAME?: ComponentName;
  COMPONENT_KEY: ComponentKey;
}

declare function asConnectedComponent<NewProps>(
  conventionalConfig: ConventionalConfig
): ComponentType<NewProps>

declare function createIdentifier(
  componentName: ComponentName,
  propName: string
): Identifier

declare function createIdentifiedActionCreators<Actions>(
  identifier: Identifier,
  componentActions: ComponentActions<Actions>
)

declare function receiveChildrenAsFunction(props: { children: Function, [key: string]: any }): Node

declare function withActionIdentity<Action extends KeyValueObject>(
  actionCreator: ActionCreator<Action>
): ActionCreator<WithIdentity<Action>>

declare function createMapStateToProps<
  State extends KeyValueObject,
  OwnProps extends KeyValueObject
>(
  reducerName: string,
  identifier: Identifier,
  structuredSelector: Function
)

declare function withReducerIdentity<ReducerState, ReducerActions>(
  identifierPredicate: string | IdentifierPredicate,
  identifiedReducer: Reducer<ReducerState, ReducerActions>
): (
  state: WithIdentityState<ReducerState>,
  action: WithIdentity<ReducerActions>
) => WithIdentityState<ReducerState>

declare function withLifecycleStateLogic(
  lifecycleStateConfiguration: LifecyleStateConfiguration
): <P>(BaseComponent: ComponentType<P>) => ComponentType<P>

export {
  init,
  receiveNextProps,
  destroy,
  INIT,
  RECEIVE_NEXT_PROPS,
  DESTROY,
  asConnectedComponent,
  createIdentifier,
  createIdentifiedActionCreators,
  connectToState,
  receiveChildrenAsFunction,
  withActionIdentity,
  createMapStateToProps,
  withReducerIdentity,
  withLifecycleStateLogic
}
export default connectToState
