import { asConnectedComponent } from 'conventional-component'

import {
  actions,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
} from '../../Counter'

export default asConnectedComponent({
  actions,
  withLogic,
  Template,
  REDUCER_NAME,
  COMPONENT_NAME,
  COMPONENT_KEY
})
