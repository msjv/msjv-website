import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  '@global': {
    body: {
      fontSmooth: 'never',
      '-webkit-font-smoothing': 'none',
      backgroundImage: 'url("/images/bg.png")'
    }
  },
  '@font-face': {
    fontFamily: 'msjv',
    src: ['ttf', 'otf', 'eot', 'woff', 'woff2']
      .map(ext => `url("/fonts/msjv.${ext}") format("${ext}")`)
      .join(', '),
    fontStyle: 'normal',
    fontWeight: 'normal'
  }
}))

const GlobalStyles = (): null => {
  useStyles()
  return null
}

export default GlobalStyles
