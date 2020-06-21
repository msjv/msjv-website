import React, { Component } from 'react'
import cn from 'classnames'

import lulu from '../assets/lulu.png'
import zf from '../foundation.scss'

class LuluPillow extends Component {
  render () {
    return (
      <div className={cn(zf.gridContainer, zf.gridX)}>
        <div className={cn(zf.cell, zf.small12)} styles={{ padding: '1em 0 5em' }}>
          <h1 style={{ fontSize: '1.2em' }}>Lulu Pillow</h1>
          <div style={{ textAlign: 'center' }}>
            <img src={lulu} />
            <br />
            <br />
            <p>I am Lulu Pillow, and I am the best ninja.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LuluPillow
