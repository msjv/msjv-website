import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home.jsx'
import _404 from './components/404.jsx'
import RainCorwell from './components/RainCorwell.jsx'
import AnysyCinysay from './components/AnysyCinysay.jsx'
import LinosMelendi from './components/LinosMelendi.jsx'
import FreeNapkins from './components/FreeNapkins.jsx'
import TinySama from './components/TinySama.jsx'
import LuluPillow from './components/LuluPillow.jsx'
import JessikaEno from './components/JessikaEno.jsx'
import WunsuccWahnquck from './components/WunsuccWahnquck.jsx'
import './App.scss'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/rain-corwell' component={RainCorwell} />
          <Route exact path='/anysy-cinysay' component={AnysyCinysay} />
          <Route exact path='/linos-melendi' component={LinosMelendi} />
          <Route exact path='/free-napkins' component={FreeNapkins} />
          <Route exact path='/tiny-sama' component={TinySama} />
          <Route exact path='/lulu-pillow' component={LuluPillow} />
          <Route exact path='/jessika-eno' component={JessikaEno} />
          <Route exact path='/wunsucc-wahnquck' component={WunsuccWahnquck} />
          <Route component={_404} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
