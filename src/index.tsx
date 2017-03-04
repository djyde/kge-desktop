import * as React from 'react'
import { render } from 'react-dom'

import './style.scss'

export const TitleBar = () => {
  return (
    <div>
      Titlebar
    </div>
  )
}

export const Sidebar = () => {
  return (
    <div>
      Sidebar
    </div>
  )
}

export const PlayList = () => {
  return (
    <div>
      PlayList
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
  return (
    <div id='container' className='flex-container flex-item one'>
      <div id='header' className='flex-item'>
        <TitleBar />
      </div>
      <div id='section' className='flex-item f1'>
        <div className='f3'>
          <Sidebar />
        </div>
        <div className='f12'>
          <PlayList/>
        </div>
      </div>
      <div id='footer' className='flex-item'>
        <Player />
      </div>      
    </div>
  )
}

render((
  <App />
), document.querySelector('#app'))
