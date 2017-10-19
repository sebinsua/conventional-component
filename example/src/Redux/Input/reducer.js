import { withReducerIdentity } from 'conventional-component'

import { reducer, COMPONENT_NAME, REDUCER_NAME } from '../../Input'

export { REDUCER_NAME }
export default withReducerIdentity(COMPONENT_NAME, reducer)
