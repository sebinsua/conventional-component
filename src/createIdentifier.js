const exists = v => !!v

const createIdentifier = (componentName, propName = 'id') => props =>
  [componentName, props[propName]].filter(exists).join('/')

export default createIdentifier
