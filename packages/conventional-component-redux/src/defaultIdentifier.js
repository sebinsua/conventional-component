// @flow

import type { IdentifierProps } from './createIdentifier'

const defaultIdentifier = ({ id }: IdentifierProps = {}): string =>
  `Component/${id}`

export default defaultIdentifier
