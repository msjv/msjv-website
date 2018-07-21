import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SE6 from './components/SE6.jsx'
import Team from './components/Team.jsx'
import _404 from './components/_404.jsx'
import './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={SE6} />
          <Route exact path='/team' component={Team} />
          <Route component={_404} />
        </Switch>
      </Router>
    )
  }
}

export default App
