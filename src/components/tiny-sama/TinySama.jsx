import React, { Component } from 'react'

import teeny from './18.png'

class TinySama extends Component {
  render () {
    return( 
    <div style={{textAlign:'center', backgroundColor: 'black', color: "pink", borderRadius: '30px', minHeight: '90vh'}}>
      <h2>tiny sama</h2>
      < img src={teeny} />
      <h3>dragoon o:</h3>
    </div>
    )
  }
}

export default TinySama
