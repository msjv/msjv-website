import React, { useEffect, useState } from 'react'
import { keyframes } from '@mui/material'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const IMG_WIDTH = 336
const IMG_HEIGHT = 216

const bounce = keyframes`
  0% { top: 0px }
  49% { top: 0px }
  50% { top: 5px }
  99% { top: 5px }
`

const slide = keyframes`
  0% { background-position: 720px }
  100% { background-position: 0px }
`

function parsePercent (data: any): number {
  if (data?.guildProgressTiles?.[0]?.currentBossPercentForDisplay == null) {
    return 0
  }

  const progress = data.guildProgressTiles[0].currentBossPercentForDisplay
  const match = progress.match(/^([\d.]+)% (P|I)(\d+)$/) ?? ['', 0, 'P', 1]
  const prog = +match[1]
  const phaseName = match[2]
  const phaseNumber = +match[3]
  const phase = phaseName === 'P' ? phaseNumber <= 4 ? phaseNumber : phaseNumber + 1 : 5
  return ((phase - 1) / 8 + (1 - prog / 100) / 8) * 100
}

const Race = (): React.ReactNode => {
  const [msjvData, setMsjvData] = useState<any>(null)
  const [tacoData, setTacoData] = useState<any>(null)
  const msjvPercent = parsePercent(msjvData)
  const tacoPercent = parsePercent(tacoData)

  useEffect(() => {
    void (async () => {
      const msjv = await fetch('/api/progress')
      const taco = await fetch('/api/progress?g=100951')
      setMsjvData(await msjv.json())
      setTacoData(await taco.json())
    })()
  }, [])

  return (
    <Grid
      container
      direction='column'
      sx={{
        width: '100vw',
        height: '100vh',
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        overflow: 'hidden',
        cursor: 'url(/images/amongus_cursor.png), auto'
      }}
    >
      <Grid item xs={3} sx={{ backgroundColor: 'black', backgroundImage: 'url(/prog.png)', backgroundSize: 'contain', backgroundPosition: '50% 50%' }} />
      <Grid item xs={6} sx={{ position: 'relative', backgroundImage: 'url(/images/rainbow.gif)' }}>
        <Grid container sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          '& > *': {
            height: '100%',
            backgroundSize: 'contain',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            border: '4px solid black'
          }
        }}>
          <Grid item xs sx={{ backgroundImage: 'url(/images/p1.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/p2.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/p3.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/p4.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/i1.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/p5.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/px.png)' }} />
          <Grid item xs sx={{ backgroundImage: 'url(/images/px.png)' }} />
        </Grid>
        <Box sx={{ position: 'relative', width: '100%', height: '50%' }}>
          <Box sx={{
            position: 'absolute',
            height: 1.00,
            width: msjvPercent / 100,
            backgroundImage: 'url(/images/yoshi_crumb.png)',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '0% 50%',
            animation: `${slide} 2s linear infinite`,
            transition: 'width 3s'
          }} />
          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              top: '50%',
              marginTop: `${-IMG_HEIGHT / 2}px`,
              marginLeft: `${-IMG_WIDTH / 2}px`,
              transition: 'left 3s'
            }}
            style={{ left: `${msjvPercent}%` }}
          >
            <Box sx={{ position: 'relative', animation: `${bounce} 1s infinite` }}>
              <Image src='/images/yoshi_car.png' width={IMG_WIDTH} height={IMG_HEIGHT} />
            </Box>
            <Box sx={{
              position: 'absolute',
              left: '100%',
              top: '0%',
              height: '100%',
              lineHeight: '100%',
              color: 'white',
              fontSize: 62,
              textShadow: '-1px -1px 5px #000, 1px -1px 5px #000, -1px 1px 5px #000, 1px 1px 5px #000, -1px -1px 5px #000, 1px -1px 5px #000, -1px 1px 5px #000, 1px 1px 5px #000'
            }}>
              {msjvData?.guildProgressTiles?.[0]?.currentBossPulls}
              <br />
              {msjvPercent.toFixed(1)}%
              <br />
              <Box component='span' sx={{ fontSize: '22px' }}>{msjvData?.guildProgressTiles?.[0]?.currentBossPercentForDisplay ?? ''}</Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative', width: '100%', height: '50%' }}>
          <Box sx={{
            position: 'absolute',
            height: 1.00,
            width: tacoPercent / 100,
            backgroundImage: 'url(/images/taco_crumb.png)',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: '0% 50%',
            animation: `${slide} 2s linear infinite`,
            transition: 'width 3s'
          }} />
          <Box
            sx={{
              display: 'inline-block',
              position: 'relative',
              top: '50%',
              marginTop: `${-IMG_HEIGHT / 2}px`,
              marginLeft: `${-IMG_WIDTH / 2}px`,
              transition: 'left 3s'
            }}
            style={{ left: `${tacoPercent}%` }}
          >
            <Box sx={{ position: 'relative', animation: `${bounce} 1s infinite`, animationDelay: '0.237s' }}>
              <Image src='/images/taco_car.png' width={IMG_WIDTH} height={IMG_HEIGHT} />
            </Box>
            <Box sx={{
              position: 'absolute',
              left: '100%',
              top: '0%',
              height: '100%',
              lineHeight: '100%',
              color: 'white',
              fontSize: 62,
              textShadow: '-1px -1px 5px #000, 1px -1px 5px #000, -1px 1px 5px #000, 1px 1px 5px #000, -1px -1px 5px #000, 1px -1px 5px #000, -1px 1px 5px #000, 1px 1px 5px #000'
            }}>
              {tacoData?.guildProgressTiles?.[0]?.currentBossPulls}
              <br />
              {tacoPercent.toFixed(1)}%
              <br />
              <Box component='span' sx={{ fontSize: '22px' }}>{tacoData?.guildProgressTiles?.[0]?.currentBossPercentForDisplay ?? ''}</Box>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ backgroundColor: 'black', backgroundImage: 'url(/prog.png?g=100951)', backgroundSize: 'contain', backgroundPosition: '50% 50%' }} />
    </Grid>
  )
}

export default Race
