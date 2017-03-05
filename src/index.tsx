import * as React from 'react'
import { render } from 'react-dom'

import './style.scss'

import Sidebar from './Sidebar'
import PlayList, { Song } from './PlayList'

import { sidebarStore } from './Sidebar'

const songs: Song[] = [
  {
    avatar: "http://kg.qq.com/gtimg/music/photo/mid_album_300/h/Q/001MFM5e15tRhQ.jpg",
    title: '路过蜻蜓',
    play_count: 1,
    shareid: '213',
    time: 123,
    ksong_mid: 'sdf'
  }
]

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
    <div id='container' className='flex-container flex-item one'>
      <div id='header' className='flex-item'>
        <TitleBar />
      </div>
      <div id='section' className='flex-item f1'>
        <div className='f3'>
          <Sidebar />
        </div>
        <div className='f12'>
          <PlayList songs={songs}/>
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
