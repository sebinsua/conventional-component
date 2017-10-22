// @flow

type IdentifierProps = { [key: string]: any }
type Identifier = (props: IdentifierProps) => string

const exists = (v: any): boolean => !!v

const createIdentifier = (
  componentName: string,
  propName: string = 'id'
): Identifier => props =>
  [componentName, props[propName]].filter(exists).join('/')

export type { Identifier, IdentifierProps }
export default createIdentifier
