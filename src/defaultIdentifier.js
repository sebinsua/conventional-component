// @flow

type Props = { [prop: string]: string }

const defaultIdentifier = ({ id }: Props = {}): string => `Component/${id}`

export type { Props }
export default defaultIdentifier
