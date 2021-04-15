import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Page from '../src/Page'

const useStyles = makeStyles(() => ({
  boxThing: {
    textAlign:'center',
    backgroundColor: 'black',
    color: 'pink',
    borderRadius: '30px',
    minHeight: '90vh',

    '& img': {
      width: '100%'
    }
  }
}))

const TinySama = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <Page>
      <div className={classes.boxThing}>
        <h2>tiny sama</h2>
        <img src='/images/18.png' />
        <Typography>dragoon o:</Typography>
      </div>
    </Page>
  )
}

export default TinySama
