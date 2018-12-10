import React, { Component } from 'react'

import Header from './components/Header.jsx'
import MainPage from './components/MainPage.jsx'
import './App.scss'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <Header />
        <main>
          <MainPage />
        </main>
      </React.Fragment>
    )
  }
}

export default App
