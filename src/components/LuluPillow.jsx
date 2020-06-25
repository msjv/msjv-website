import React, { Component } from 'react'

import lulu from '../assets/lulu.png'

class LuluPillow extends Component {
  render () {
    return (
      <>
        <h1 style={{ fontSize: '1.2em' }}>Lulu Pillow</h1>
        <div style={{ textAlign: 'center' }}>
          <img src={lulu} />
          <br />
          <br />
          <p>I am Lulu Pillow, and I am the best ninja.</p>
        </div>
      </>
    )
  }
}

export default LuluPillow
