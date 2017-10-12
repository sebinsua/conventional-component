const getDisplayName = (value, defaultDisplayName) => {
  if (typeof value === 'string') {
    return value
  }

  if (!value) {
    return undefined
  }

  return value.displayName || value.name || defaultDisplayName
}

export default getDisplayName
