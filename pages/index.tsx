import React, { useEffect, useState } from 'react'
import { keyframes } from '@mui/system'
import Box from '@mui/material/Box'

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
const MARQUEE_KEYFRAME = keyframes`
  0%   { left: 100% }
  100% { left: -10000px }
`
const MARQUEE_STYLES = [
  `${keyframes`
  0%    { color: #FF0000 }
  33%   { color: #00B000 }
  66%   { color: #0000FF }
  100%  { color: #FF0000 }
`} 3s linear infinite`,
  `${keyframes`
  0%    { color:  #FF0000  }
  33%   { color:  #800080  }
  66%   { color:  #0000FF  }
  100%  { color:  #FF0000  }
`} 3s linear infinite`,
  `${keyframes`
  0%    { color:  #FFFFFF  }
  25%   { color:  #00B000  }
  50%   { color:  #FFFFFF  }
  67.5% { color:  #00FFFF  }
  75%   { color:  #0000FF  }
  100%  { color:  #FFFFFF  }
`} 3s linear infinite`,
  `${keyframes`
  0%    { color: #FF0000 }
  50%   { color: #FFFF00 }
`} 0.45s steps(1, end) infinite`,
  `${keyframes`
  0%    { color: #0000FF }
  50%   { color: #00FFFF }
`} 0.45s steps(1, end) infinite`,
  `${keyframes`
  0%    { color: #00B000 }
  50%   { color: #80FF80 }
`} 0.45s steps(1, end) infinite`
]

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
  const [marquees, setMarquees] = useState<marquee[]>([])

  const spawnMarquee = (): void => {
    setMarquees(marquees => {
      const timeout = range(10000, 50000)
      const timeoutId = setTimeout(() => {
        deleteMarquee(timeoutId)
      }, timeout - 100)

      const newMarquees = marquees.slice()
      newMarquees.push({
        timeout,
        timeoutId,
        text: pick(MARQUEE_TEXTS),
        position: range(2, 45),
        size: range(2, 8),
        style: pick(MARQUEE_STYLES),
        font: pick(MARQUEE_FONTS)
      })
      return newMarquees
    })
  }

  const deleteMarquee = (timeoutId: NodeJS.Timeout): void => {
    setMarquees(marquees => {
      const index = marquees.findIndex(marquee => marquee.timeoutId === timeoutId)
      if (index !== -1) {
        const newMarquees = marquees.slice()
        newMarquees.splice(index, 1)
        return newMarquees
      } else {
        return marquees
      }
    })
  }

  useEffect(() => {
    let spawner: NodeJS.Timeout | undefined
    (function loop (): void {
      spawner = setTimeout(() => {
        spawnMarquee()
        loop()
      }, 977)
    })()

    return () => {
      if (spawner !== undefined) {
        clearTimeout(spawner)
      }
      for (const marquee of marquees) {
        clearTimeout(marquee.timeoutId)
      }
    }
  }, [])
  console.log(marquees)

  return (
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(\'https://media.discordapp.net/attachments/461357919628296196/894838119684268052/dogwalkers.png\')',
      backgroundColor: 'black',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      fontSize: '20px',
      overflow: 'hidden'
    }}>
      {marquees.map(marquee => (
        <Box key={Number(marquee.timeoutId)} sx={{
          position: 'absolute',
          fontWeight: 'bold',
          color: 'white',
          whiteSpace: 'nowrap',
          animation: `${MARQUEE_KEYFRAME} ${marquee.timeout / 1000}s linear, ${marquee.style}`,
          top: `${marquee.position}%`,
          fontFamily: marquee.font,
          fontSize: `${marquee.size}em`
        }} >
          {marquee.text}
        </Box>
      ))}
    </Box>
  )
}

export default Index
