import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
    padding: theme.spacing(5, 10),
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderImage: 'url("/images/border.png") 20'
  }
}))

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props): React.ReactElement => {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      {children as React.ReactChild}
    </Container>
  )
}

export default Page
