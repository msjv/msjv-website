import React, { Component } from 'react'
import cn from 'classnames'

import zf from '../foundation.scss'
import styles from './Team.scss'
import dadaluma from '../assets/DADABONGOfull.png'

const FRIENDS = [
  'PLD',
  'DRK',
  'WHM',
  'AST',
  'NIN',
  'DRG',
  'SMN',
  'BRD'
]
const ICON_DIMENSIONS = {
  width: 50,
  height: 50
}
const DADALUMA_DIMENSIONS = {
  width: 178,
  height: 112
}
const ANIMATION_DURATION = 2000

class Team extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dadaluma: {
        x: 0,
        y: 0,
        flipped: false
      }
    }
    for (const friend of FRIENDS) {
      this.state[friend] = {
        x: Math.random() * (window.innerWidth - ICON_DIMENSIONS.width),
        y: Math.random() * (window.innerHeight - ICON_DIMENSIONS.height),
        dead: false
      }
    }

    this.revivePlayer = this.revivePlayer.bind(this)
    this.killPlayer = this.killPlayer.bind(this)
  }

  revivePlayer () {
    const dead = FRIENDS.filter(friend => this.state[friend].dead)
    if (!dead.length) {
      return
    }

    const revive = dead[Math.random() * dead.length | 0]
    this.setState({
      [revive]: {
        x: Math.random() * (window.innerWidth - ICON_DIMENSIONS.width),
        y: Math.random() * (window.innerHeight - ICON_DIMENSIONS.height),
        dead: false
      }
    })

    setTimeout(this.killPlayer)
  }

  killPlayer () {
    if (this.killingPlayer) {
      console.log('asdf')
      return
    }

    const alive = FRIENDS.filter(friend => !this.state[friend].dead)
    if (!alive.length) {
      return
    }

    const kill = alive[Math.random() * alive.length | 0]
    const prevX = this.state.dadaluma.x +
      (this.state.dadaluma.flipped ? -ICON_DIMENSIONS.width : DADALUMA_DIMENSIONS.width)
    const flipped = this.state[kill].x < prevX

    if (flipped) {
      this.setState({
        dadaluma: {
          x: this.state[kill].x + ICON_DIMENSIONS.width,
          y: this.state[kill].y + (ICON_DIMENSIONS.height - DADALUMA_DIMENSIONS.height) / 2,
          flipped: true
        }
      })
    } else {
      this.setState({
        dadaluma: {
          x: this.state[kill].x - DADALUMA_DIMENSIONS.width,
          y: this.state[kill].y + (ICON_DIMENSIONS.height - DADALUMA_DIMENSIONS.height) / 2,
          flipped: false
        }
      })
    }

    this.killingPlayer = setTimeout(() => {
      this.setState({
        [kill]: {
          x: this.state[kill].x,
          y: this.state[kill].y,
          dead: true
        }
      })
      this.killingPlayer = undefined
      this.killPlayer()
    }, ANIMATION_DURATION)
  }

  componentDidMount () {
    setTimeout(this.killPlayer)
  }

  componentWillUnmount () {
    if (this.killingPlayer) {
      clearTimeout(this.killingPlayer)
    }
  }

  render () {
    window.kill = this.killPlayer.bind(this)
    window.spawn = this.revivePlayer.bind(this)

    return (
      <div className={styles.team}>
        {FRIENDS.map(friend => {
          const friendState = this.state[friend]
          return (
            <div key={friend}
              className={cn(styles.friend, { [styles.dead]: friendState.dead })}
              style={{ left: friendState.x + 'px', top: friendState.y + 'px' }}
            />
          )
        })}
        <img src={dadaluma}
          className={cn(styles.dadaluma, { [styles.flipped]: this.state.dadaluma.flipped })}
          style={{ left: this.state.dadaluma.x + 'px', top: this.state.dadaluma.y + 'px' }}
        />
        <div className={styles.raise}>
          <button className={zf.button} onClick={this.revivePlayer}>Raise</button>
        </div>
      </div>
    )
  }
}

export default Team
