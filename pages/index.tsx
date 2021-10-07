import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

function range (min: number, max: number): number {
  return min + (max - min) * Math.random()
}

function pick<T> (array: T[]): T {
  return array[Math.floor(array.length * Math.random())]
}

const MARQUEE_TEXTS = [
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
  'WUNSUCC WAHNQUCK',
  'U・ﻌ・U┬─┬ﾉ~'
]

const MARQUEE_FONTS = [
  'Arial, sans-serif',
  'Verdana, sans-serif',
  'Helvetica, sans-serif',
  'Tahoma, sans-serif',
  '"Trebuchet MS", sans-serif',
  '"Times New Roman", serif',
  'Georgia, serif',
  'Garamond, serif',
  '"Courier New", monospace'
]

const MARQUEE_STYLES = [
  'glow1 3s linear infinite',
  'glow2 3s linear infinite',
  'glow3 3s linear infinite',
  'flash1 0.45s steps(1, end) infinite',
  'flash2 0.45s steps(1, end) infinite',
  'flash3 0.45s steps(1, end) infinite'
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
    fontWeight: 'bold',
    color: 'white',
    whiteSpace: 'nowrap'
  },
  '@global': {
    '@keyframes marquee': {
      '0%': { left: '100%' },
      '100%': { left: '-10000px' }
    },
    '@keyframes flash1': {
      '0%': { color: '#FF0000' },
      '50%': { color: '#FFFF00' }
    },
    '@keyframes flash2': {
      '0%': { color: '#0000FF' },
      '50%': { color: '#00FFFF' }
    },
    '@keyframes flash3': {
      '0%': { color: '#00B000' },
      '50%': { color: '#80FF80' }
    },
    '@keyframes glow1': {
      '0%': { color: '#FF0000' },
      '33%': { color: '#00B000' },
      '66%': { color: '#0000FF' },
      '100%': { color: '#FF0000' }
    },
    '@keyframes glow2': {
      '0%': { color: '#FF0000' },
      '33%': { color: '#800080' },
      '66%': { color: '#0000FF' },
      '100%': { color: '#FF0000' }
    },
    '@keyframes glow3': {
      '0%': { color: '#FFFFFF' },
      '25%': { color: '#00B000' },
      '50%': { color: '#FFFFFF' },
      '67.5%': { color: '#00FFFF' },
      '75%': { color: '#0000FF' },
      '100%': { color: '#FFFFFF' }
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
  font: string
}

const Index = (): React.ReactElement => {
  const classes = useStyles()
  const [marquees, setMarquees] = useState<marquee[]>([])

  const spawnMarquee = (): void => {
    const timeout = range(10000, 50000)
    const timeoutId = setTimeout(() => {
      deleteMarquee(timeoutId)
    }, timeout - 100)

    const marquee = {
      timeout,
      timeoutId,
      text: pick(MARQUEE_TEXTS),
      position: range(2, 45),
      size: range(2, 8),
      style: pick(MARQUEE_STYLES),
      font: pick(MARQUEE_FONTS)
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
    }, 977)

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
              fontFamily: marquee.font,
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
