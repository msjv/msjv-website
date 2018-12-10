import React, { Component } from 'react'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './Header.scss'

class Header extends Component {
  render () {
    return (
      <header className={styles.header}>
        <div className={styles.title}>Chinese Study Group</div>
        <nav className={styles.nav}>
          <ul className={classnames(zf.menu, zf.alignCenter)}>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>Profiles</a></li>
            <li><a href='#'>Contact</a></li>
            <li><a href='#'>5d go</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
