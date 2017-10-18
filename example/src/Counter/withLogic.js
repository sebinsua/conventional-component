import { compose, lifecycle, withHandlers } from 'recompose'

const withLogic = compose(
  lifecycle({
    componentWillMount() {
      this.props.init(this.props)
    }
  }),
  withHandlers({
    increment: props => event => {
      event.preventDefault()
      props.increment()
    }
  })
)

export default withLogic
