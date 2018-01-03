import { compose, withHandlers, mapProps } from 'recompose'
import { withLifecycleStateLogic } from 'conventional-component'

const withLogic = compose(
  withLifecycleStateLogic({ shouldDispatchReceiveNextProps: false }),
  withHandlers({
    setValue: props => (value, event) => {
      event.preventDefault()
      props.setValue(value)
    },
    previousValue: props => event => {
      event.preventDefault()
      props.previousValue()
    },
    nextValue: props => event => {
      event.preventDefault()
      props.nextValue()
    }
  }),
  mapProps(props => ({
    states: props.availableStates,
    currentValue: props.value,
    setValue: props.setValue,
    previousValue: props.previousValue,
    nextValue: props.nextValue
  }))
)

export default withLogic
