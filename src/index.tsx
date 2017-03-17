import * as React from 'react'
import { render } from 'react-dom'

import './style.scss'

import Sidebar from './Sidebar'
import PlayList from './PlayList'
import Player from './Player'

import { sidebarStore } from './Sidebar'

export const TitleBar = () => {
  return (
    <div id='titlebar'>

    </div>
  )
}

export const App = () => {
  sidebarStore.fetchUsers()
  return (
    <div id='app-container'>
      <div id='header'>
        <TitleBar />
      </div>
      <div id='section'>
        <Sidebar />
        <PlayList />
      </div>
      <div id='footer'>
        <Player />
      </div>
    </div>
  )
}

render((
  <App />
), document.querySelector('#app'))
