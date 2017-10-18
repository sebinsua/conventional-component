import { withHandlers } from 'recompose'

const withLogic = withHandlers({
  increment: props => event => {
    event.preventDefault()
    props.increment()
  }
})

export default withLogic
