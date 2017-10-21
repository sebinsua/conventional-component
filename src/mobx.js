// NOTE:
// The following `peerDependencies` have been removed since the library is meant to be state management agnostic.
// "mobx-react": "*",
// "mobx": "*"

let observable = false
let extendObservable = false
let observer = false
try {
  const MobX = require('mobx')
  const MobXReact = require('mobx-react')

  observable = MobX.observable
  extendObservable = MobX.extendObservable
  connect = MobXReact.observer
} catch (err) {
  observable = false
  extendObservable = false
  observer = false
}

export { observable, extendObservable, observer }
