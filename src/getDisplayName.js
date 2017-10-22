// @flow

const getDisplayName = (
  value: Function,
  defaultDisplayName: string
): string => {
  return (value && (value.displayName || value.name)) || defaultDisplayName
}

export default getDisplayName
