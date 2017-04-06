import * as React from 'react'

import Sidebar from './Sidebar'
import PlayList from './PlayList'
import Player from './Player'
import { inject } from 'cans'

const App = inject(({ models }) => {
  models.sidebar.fetchUsers()
  return (
    <div id='app-container'>
      <div id='header'>
        <div id='titlebar' />
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
})

export default App
