import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home.jsx'
import _404 from './components/404.jsx'
import './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={_404} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
