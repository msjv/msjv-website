import React, { Component } from 'react'
import cn from 'classnames'

import styles from './Team.scss'
import dadaluma from '../assets/DADABONGOfull.png'
import raise from '../assets/raise.png'

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
const CASTING_DURATION = 1000
const ARENA_PADDING = 80

class Team extends Component {
  constructor (props) {
    super(props)

    this.state = {
      casting: false,
      dadaluma: {
        x: 0,
        y: 0,
        flipped: false
      }
    }
    for (const friend of FRIENDS) {
      const spawnPosition = this.getSpawnPosition()
      this.state[friend] = {
        x: spawnPosition.x,
        y: spawnPosition.y,
        dead: false
      }
    }

    this.revivePlayer = this.revivePlayer.bind(this)
    this.killPlayer = this.killPlayer.bind(this)
  }

  getSpawnPosition () {
    return {
      x: Math.random() * (window.innerWidth - ICON_DIMENSIONS.width - ARENA_PADDING * 2) + ARENA_PADDING,
      y: Math.random() * (window.innerHeight - ICON_DIMENSIONS.height - ARENA_PADDING * 2) + ARENA_PADDING
    }
  }

  revivePlayer () {
    if (this.revivingPlayer) {
      return
    }

    const dead = FRIENDS.filter(friend => this.state[friend].dead)
    if (!dead.length) {
      return
    }

    const reviveIndex = Math.random() * dead.length | 0
    const revive = dead[reviveIndex]
    this.setState({ casting: true })

    this.revivingPlayer = setTimeout(() => {
      const spawnPosition = this.getSpawnPosition()
      this.setState({
        casting: false,
        [revive]: {
          x: spawnPosition.x,
          y: spawnPosition.y,
          dead: false
        }
      })
      FRIENDS.push(FRIENDS.splice(reviveIndex, 1)[0])
      this.revivingPlayer = undefined
      setTimeout(this.killPlayer)
    }, CASTING_DURATION)
  }

  killPlayer () {
    if (this.killingPlayer) {
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
    if (this.revivingPlayer) {
      clearTimeout(this.revivingPlayer)
    }
    if (this.killingPlayer) {
      clearTimeout(this.killingPlayer)
    }
  }

  render () {
    return (
      <div className={styles.team}>
        {FRIENDS.map(friend => {
          const friendState = this.state[friend]
          return (
            <div key={friend}
              className={cn(styles.friend, styles[friend], { [styles.dead]: friendState.dead })}
              style={{ left: friendState.x + 'px', top: friendState.y + 'px' }}
            />
          )
        })}
        <img src={dadaluma}
          className={cn(styles.dadaluma, { [styles.flipped]: this.state.dadaluma.flipped })}
          style={{ left: this.state.dadaluma.x + 'px', top: this.state.dadaluma.y + 'px' }}
        />
        <div className={styles.raise}>
          <div className={cn(styles.castHud, { [styles.casting]: this.state.casting })}>
            Raise
            <div className={styles.progressBar} />
          </div>
          <br />
          <img src={raise} onClick={this.revivePlayer} />
        </div>
      </div>
    )
  }
}

export default Team
