import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  splash: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),

    '& > div': {
      padding: theme.spacing(5, 5, 2),
      borderRadius: '1em',
      backgroundColor: 'white',
      boxShadow: Array(5).fill('0 0 1em white').join(', ')
    }
  },

  roster: {
    width: 800,
    maxWidth: '100%',
    margin: theme.spacing(5, 'auto', 10),
    border: '20px solid transparent',
    borderImage: 'url("/images/border.png") 20 round',
    padding: theme.spacing(5),
    backgroundColor: 'white',

    '& h1': {
      fontSize: '1.2em',
      lineHeight: 1,
      textAlign: 'center'
    },

    '& ul': {
      listStyle: 'none',
      margin: theme.spacing(5),
      '& > li span': {
        verticalAlign: 'middle',
        cursor: 'pointer'
      }
    }
  },

  jobIcon: {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    position: 'relative',
    top: '0.1em',
    backgroundImage: 'url("/images/jobs.png")',
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
    marginRight: '0.5em'
  },

  DRK: { backgroundPosition: '0 0' },
  GNB: { backgroundPosition: '0 -1em' },
  AST: { backgroundPosition: '0 -2em' },
  SCH: { backgroundPosition: '0 -3em' },
  DRG: { backgroundPosition: '0 -4em' },
  NIN: { backgroundPosition: '0 -5em' },
  DNC: { backgroundPosition: '0 -6em' },
  SMN: { backgroundPosition: '0 -7em' }
}))

const Index = (): React.ReactElement => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.splash}>
        <div>
          <img src='/images/msjv.png' />
          <Typography>“Tackling life one braincell at a time”</Typography>
        </div>
      </div>
      <div className={classes.roster}>
        <h1>~ THE STATIC ~</h1>
        <hr />
        <ul>
          <li>
            <Link href='/rain-corwell'>
              <span>
                <div className={clsx(classes.jobIcon, classes.DRK)} />
                Rain Corwell
              </span>
            </Link>
          </li>
          <li>
            <Link href='/anysy-cinysay'>
              <span>
                <div className={clsx(classes.jobIcon, classes.GNB)} />
                Anysy Cinysay
              </span>
            </Link>
          </li>
          <li>
            <Link href='/linos-melendi'>
              <span>
                <div className={clsx(classes.jobIcon, classes.AST)} />
                Linos Melendi
              </span>
            </Link>
          </li>
          <li>
            <Link href='/free-napkins'>
              <span>
                <div className={clsx(classes.jobIcon, classes.SCH)} />
                Free Napkins
              </span>
            </Link>
          </li>
          <li>
            <Link href='/tiny-sama'>
              <span>
                <div className={clsx(classes.jobIcon, classes.DRG)} />
                Tiny Sama
              </span>
            </Link>
          </li>
          <li>
            <Link href='/lulu-pillow'>
              <span>
                <div className={clsx(classes.jobIcon, classes.NIN)} />
                Lulu Pillow
              </span>
            </Link>
          </li>
          <li>
            <Link href='/jessika-eno'>
              <span>
                <div className={clsx(classes.jobIcon, classes.DNC)} />
                Jessika Eno
              </span>
            </Link>
          </li>
          <li>
            <Link href='/wunsucc-wahnquck'>
              <span>
                <div className={clsx(classes.jobIcon, classes.SMN)} />
                Wunsucc Wahnquck
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Index
