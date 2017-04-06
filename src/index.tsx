import * as React from 'react'
import cans from 'cans'

import './style.scss'

import App from './App'

import sidebarModel from './models/sidebar'

const app = cans()

app.model(sidebarModel)

const route = () => (
  <App />
)

app.route(route)

app.start(document.querySelector('#app'))
