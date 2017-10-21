import { compose, withHandlers } from 'recompose'
import { withLifecycleStateLogic } from 'conventional-component'

const withLogic = compose(
  withLifecycleStateLogic({ shouldDispatchReceiveNextProps: false }),
  withHandlers({
    increment: props => event => {
      event.preventDefault()
      props.increment()
    }
  })
)

export default withLogic
