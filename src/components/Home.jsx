import React, { Component } from 'react'

import msjv from '../assets/msjv.png'
import styles from './Home.scss'

class Home extends Component {
  render () {
    return (
      <div className={styles.splash}>
        <div>
          <img src={msjv} />
          <p>“Tackling life one braincell at a time”</p>
        </div>
      </div>
    )
  }
}

export default Home
