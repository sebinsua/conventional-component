// @flow

import type { ActionCreator } from './types'
import type { Init, NextProps, Destroy } from './actions'
import type { WithIdentity } from './withActionIdentity'

import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

type LifecyleStateConfiguration = {
  shouldDispatchReceiveNextProps: boolean
}

type WithLifecycleStateLogicProps = {
  init: ActionCreator<WithIdentity<Init>>,
  receiveNextProps: ActionCreator<WithIdentity<NextProps>>,
  destroy: ActionCreator<WithIdentity<Destroy>>
}

const withLifecycleStateLogic = <Props>(
  { shouldDispatchReceiveNextProps = false }: LifecyleStateConfiguration = {}
) => (BaseComponent: Component<Props, *>) => {
  // $FlowFixMe
  const factory = createFactory(BaseComponent)
  class WithLifecycleStateLogic extends Component<
    WithLifecycleStateLogicProps,
    *
  > {
    componentWillMount() {
      this.props.init(this.props)
    }

    componentWillReceiveProps(nextProps: WithLifecycleStateLogicProps) {
      if (shouldDispatchReceiveNextProps) {
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

export default withLifecycleStateLogic
