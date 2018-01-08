// @flow

import type { ComponentType } from 'react'
import type { ActionCreator } from './actions'
import type { Init, NextProps, Destroy } from './actions'
import type { WithIdentity } from './withActionIdentity'

import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

type ShouldDispatchFn = (
  props: { [key: string]: any },
  newProps: { [key: string]: any }
) => boolean

type LifecyleStateConfiguration = {
  shouldDispatchReceiveNextProps: ShouldDispatchFn | false
}

type WithLifecycleStateLogicProps = {
  init: ActionCreator<WithIdentity<Init>>,
  receiveNextProps: ActionCreator<WithIdentity<NextProps>>,
  destroy: ActionCreator<WithIdentity<Destroy>>
}

const withLifecycleStateLogic = (
  { shouldDispatchReceiveNextProps }: LifecyleStateConfiguration = {}
) => (BaseComponent: ComponentType<*>) => {
  const factory = createFactory(BaseComponent)
  class WithLifecycleStateLogic extends Component<
    WithLifecycleStateLogicProps,
    *
  > {
    componentDidMount() {
      this.props.init(this.props)
    }

    componentWillReceiveProps(nextProps: WithLifecycleStateLogicProps) {
      const shouldDispatch =
        typeof shouldDispatchReceiveNextProps === 'function'
          ? shouldDispatchReceiveNextProps(this.props, nextProps)
          : !!shouldDispatchReceiveNextProps
      if (shouldDispatch) {
        this.props.receiveNextProps(nextProps)
      }
    }

    componentWillUnmount() {
      this.props.destroy()
    }

    render() {
      return factory(this.props)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    const componentName = getDisplayName(BaseComponent, 'Component')
    WithLifecycleStateLogic.displayName = `withLifecycleStateLogic(${componentName})`
  }

  return WithLifecycleStateLogic
}

export type { LifecyleStateConfiguration, WithLifecycleStateLogicProps }
export default withLifecycleStateLogic
