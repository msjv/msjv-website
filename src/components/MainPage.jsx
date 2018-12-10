import React, { Component } from 'react'
import classnames from 'classnames'

import zf from '../foundation.scss'
import styles from './MainPage.scss'

const tableInfo = [{
  name: 'Edwin Holmes',
  icon: 'DRK',
  dp: 1.803
}, {
  name: 'Lulu Pillow',
  icon: 'PLD',
  dp: 1.112
}, {
  name: 'Free Napkins',
  icon: 'SCH',
  dp: 1.534
}, {
  name: 'Bees Knees',
  icon: 'WHM',
  dp: 0.809
}, {
  name: 'Tiny Sama',
  icon: 'DRG',
  dp: 1.209
}, {
  name: 'Sushi Chan',
  icon: 'SAM',
  dp: 5.978
}, {
  name: 'Wunsucc Wahnquck',
  icon: 'SMN',
  dp: 0.953
}, {
  name: 'Soy Milk',
  icon: 'BRD',
  dp: 1.342
}]

class MainPage extends Component {
  render () {
    return (
      <div className={zf.gridContainer}>
        <h1>Deaths/Pulls</h1>
        <div className={classnames(styles.dpTable, zf.gridX, zf.gridPaddingX)}>
          <div className={classnames(zf.cell, zf.small6)}>
            <table className={zf.unstriped}>
              <tbody>
                {tableInfo.map(info =>
                  <tr key={info.icon}>
                    <td><div className={styles[`icon${info.icon}`]} /></td>
                    <td style={{ width: '100%' }}>{info.name}</td>
                    <td>{info.dp.toFixed(3)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={classnames(zf.cell, zf.small6)}>
            <div className={styles.raiseRaiseRaise} />
          </div>
        </div>
        <br />
        <div className={zf.textCenter}>
          <h1>Hat Kid Shame Counter</h1>
          <div className={styles.shameCounter}>
            <em>265 vulnerability stacks</em><br />
            in 147 savage pulls
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage
