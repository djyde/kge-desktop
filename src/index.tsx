import * as React from 'react'
import { render } from 'react-dom'

import './style.scss'

import Sidebar from './Sidebar'
import PlayList, { Song } from './PlayList'

import { sidebarStore } from './Sidebar'

export const TitleBar = () => {
  return (
    <div id='titlebar'>

    </div>
  )
}

export const Player = () => {
  return (
    <div>
      Player
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
        <div id='player'>
          <Player />
        </div>
      </div>
    </div>
  )
}

render((
  <App />
), document.querySelector('#app'))
