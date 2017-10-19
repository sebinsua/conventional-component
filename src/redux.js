let connect = false
let bindActionCreators = false
try {
  const ReactRedux = require('react-redux')
  const Redux = require('redux')

  connect = ReactRedux.connect
  bindActionCreators = Redux.bindActionCreators
} catch (err) {
  connect = false
  bindActionCreators = false
}

export { connect, bindActionCreators }
