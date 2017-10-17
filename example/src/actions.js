const prefix = '@@connectToState'

export const INIT = `${prefix}/INIT`

export function init() {
  return { type: INIT }
}
