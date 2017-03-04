import * as React from 'react'
import { render } from 'react-dom'

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
    <div>
      <Sidebar />
      <PlayList />
      <Player />
    </div>
  )
}


render((
  <App />
), document.querySelector('#app'))