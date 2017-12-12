// @flow

const getDisplayName = (value?: any, defaultDisplayName: string): string => {
  return (value && (value.displayName || value.name)) || defaultDisplayName
}

export default getDisplayName
