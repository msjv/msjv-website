import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import msjv from '../assets/msjv.png'
import styles from './Home.scss'

class Home extends Component {
  render () {
    return (
      <div>
        <div className={styles.splash}>
          <div>
            <img src={msjv} />
            <p>“Tackling life one braincell at a time”</p>
          </div>
        </div>
        <div className={styles.roster}>
          <h1>~ THE STATIC ~</h1>
          <hr />
          <ul>
            <li>
              <Link to='/rain-corwell'><div className={cn(styles.jobIcon, styles.DRK)} />Rain Corwell</Link>
            </li>
            <li>
              <Link to='/anysy-cinysay'><div className={cn(styles.jobIcon, styles.GNB)} />Anysy Cinysay</Link>
            </li>
            <li>
              <Link to='/linos-melendi'><div className={cn(styles.jobIcon, styles.AST)} />Linos Melendi</Link>
            </li>
            <li>
              <Link to='/free-napkins'><div className={cn(styles.jobIcon, styles.SCH)} />Free Napkins</Link>
            </li>
            <li>
              <Link to='/tiny-sama'><div className={cn(styles.jobIcon, styles.DRG)} />Tiny Sama</Link>
            </li>
            <li>
              <Link to='/lulu-pillow'><div className={cn(styles.jobIcon, styles.NIN)} />Lulu Pillow</Link>
            </li>
            <li>
              <Link to='/jessika-eno'><div className={cn(styles.jobIcon, styles.DNC)} />Jessika Eno</Link>
            </li>
            <li>
              <Link to='/wunsucc-wahnquck'><div className={cn(styles.jobIcon, styles.SMN)} />Wunsucc Wahnquck</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
