import { createFactory, Component } from 'react'
import getDisplayName from './getDisplayName'

type LifecyleStateConfiguration = {
  shouldDispatchReceiveNextProps: boolean
}

const withLifecycleStateLogic = (
  { shouldDispatchReceiveNextProps = false }: LifecyleStateConfiguration = {}
) => BaseComponent => {
  const factory = createFactory(BaseComponent)
  class WithLifecycleStateLogic extends Component {
    componentWillMount() {
      this.props.init(this.props)
    }

    componentWillReceiveProps(nextProps) {
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
