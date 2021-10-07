import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

function range (min: number, max: number): number {
  return min + (max - min) * Math.random()
}

const MARQUEE_TEXT = [
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'DOG WALKERS',
  'BEES KNEES',
  'ELLIOT SINCLAIR',
  'FREE NAPKINS',
  'LINOS MELENDI',
  'LULU PILLOW',
  'RAIN CORWELL',
  'TINY SAMA',
  'WUNSUCC WAHNCUCK',
  'U・ﻌ・U┬─┬ﾉ~'
]

const MARQUEE_STYLES = [
  'rainbow 1.79s linear 0s infinite'
]

const useStyles = makeStyles(() => ({
  splash: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(\'https://media.discordapp.net/attachments/461357919628296196/894838119684268052/dogwalkers.png\')',
    backgroundColor: 'black',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    overflow: 'hidden',
    fontSize: '1rem'
  },
  marquee: {
    position: 'absolute',
    top: '100px',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  '@global': {
    '@keyframes marquee': {
      '0%': {
        left: '100%'
      },
      '100%': {
        left: '-100%'
      }
    },
    '@keyframes rainbow': {
      '0%': {
        color: '#6666ff'
      },
      '10%': {
        color: '#0099ff'
      },
      '50%': {
        color: '#00ff00'
      },
      '75%': {
        color: '#ff3399'
      },
      '100%': {
        color: '#6666ff'
      }
    }
  }
}))

interface marquee {
  timeout: number
  timeoutId: NodeJS.Timeout
  text: string
  position: number
  size: number
  style: string
}

const Index = (): React.ReactElement => {
  const classes = useStyles()
  const [marquees, setMarquees] = useState<marquee[]>([])

  const spawnMarquee = (): void => {
    const timeout = range(4000, 20000)
    const timeoutId = setTimeout(() => {
      deleteMarquee(timeoutId)
    }, timeout)

    const marquee = {
      timeout,
      timeoutId,
      text: MARQUEE_TEXT[Math.floor(MARQUEE_TEXT.length * Math.random())],
      position: range(2, 45),
      size: range(2, 8),
      style: MARQUEE_STYLES[Math.floor(MARQUEE_STYLES.length * Math.random())]
    }
    marquees.push(marquee)
    setMarquees(marquees.slice())
  }

  const deleteMarquee = (timeoutId: NodeJS.Timeout): void => {
    for (let i = 0; i < marquees.length; ++i) {
      if (marquees[i].timeoutId === timeoutId) {
        marquees.splice(i, 1)
        setMarquees(marquees.slice())
      }
    }
  }

  useEffect(() => {
    const spawner = setInterval(() => {
      spawnMarquee()
    }, 1000)

    return () => {
      clearInterval(spawner)
      for (const marquee of marquees) {
        clearTimeout(marquee.timeoutId)
      }
    }
  }, [])

  return (
    <>
      <div className={classes.splash}>
        {marquees.map(marquee =>
          <div
            key={Number(marquee.timeoutId)}
            className={classes.marquee}
            style={{
              animation: `marquee ${marquee.timeout / 1000}s linear, ${marquee.style}`,
              top: `${marquee.position}%`,
              fontSize: `${marquee.size}em`
            }}
          >
            {marquee.text}
          </div>
        )}
      </div>
    </>
  )
}

export default Index
