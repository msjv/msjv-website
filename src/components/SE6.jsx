import React, { Component } from 'react'
import cn from 'classnames'

import se6 from './SE6.ogg'
import dadaluma from './DADABONGOfull.png'
import styles from './SE6.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      runProgram: false
    }

    this.counter = -1
    this.se6 = new window.Audio(se6)
    this.onClickSE6 = this.onClickSE6.bind(this)
  }

  onClickSE6 () {
    if (!this.state.runProgram) {
      this.setState({
        runProgram: true,
        flipped: ++this.counter & 1
      })

      this.se6.play()
        .catch(error => console.error(error))

      this.endProgram = setTimeout(() => {
        this.setState({ runProgram: false })
        this.endProgram = null
      }, 2500)
    }
  }

  componentWillUnmount () {
    if (this.endProgram) {
      clearTimeout(this.endProgram)
    }
  }

  render () {
    return (
      <div className={styles.se6} onClick={this.onClickSE6}>
        :3c
        <img className={cn(styles.dadaluma, {
          [styles.runProgram]: this.state.runProgram && !this.state.flipped,
          [styles.runProgramFlipped]: this.state.runProgram && this.state.flipped
        })} src={dadaluma} />
      </div>
    )
  }
}

export default App
