import React, { Component } from 'react'

import se6 from './SE6.ogg'
import styles from './SE6.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.se6 = new window.Audio(se6)
    this.onClickSE6 = this.onClickSE6.bind(this)
  }

  onClickSE6 () {
    this.se6.play()
      .catch(error => console.error(error))
  }

  render () {
    return (
      <div className={styles.se6} onClick={this.onClickSE6}>
        :3c
      </div>
    )
  }
}

export default App
