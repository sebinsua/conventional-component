import React, { Component } from 'react'
import Counter from './Counter'
import Input, { Template as InputTemplate } from './Input'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter id="1" />
        <Input name="input-name-1" />
        <Input name="input-name-2">{InputTemplate}</Input>
      </div>
    )
  }
}

export default App
