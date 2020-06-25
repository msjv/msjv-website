import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import RainCorwell from './rain-corwell/RainCorwell.jsx'
import AnysyCinysay from './anysy-cinysay/AnysyCinysay.jsx'
import LinosMelendi from './linos-melendi/LinosMelendi.jsx'
import FreeNapkins from './free-napkins/FreeNapkins.jsx'
import TinySama from './tiny-sama/TinySama.jsx'
import LuluPillow from './lulu-pillow/LuluPillow.jsx'
import JessikaEno from './jessika-eno/JessikaEno.jsx'
import WunsuccWahnquck from './wunsucc-wahnquck/WunsuccWahnquck.jsx'
import _404 from './404.jsx'

import styles from './UserPage.scss'

console.log(styles)

class UserPage extends Component {
  render () {
    return (
      <div className={styles.container}>
        <Switch>
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
      </div>
    )
  }
}

export default UserPage
