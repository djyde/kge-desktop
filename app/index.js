const electron = require('electron')
const path = require('path')
const url = require('url')
const { template } = require('./menu')
const defaultMenu = require('electron-default-menu')

const { app, Menu, shell } = electron

let mainWindow
let isQuitting = false

const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore()
		}

		mainWindow.show()
	}
})

if (isAlreadyRunning) {
  app.quit()
}

const URL = url.format({
  pathname: path.resolve(__dirname, './index.html'),
  protocol: 'file:',
  slashes: true
})

function createMainWindow () {
  const win = new electron.BrowserWindow({
    show: false,
    titleBarStyle: 'hidden-inset',
    width: 1000,
    height: 640,
    minWidth: 970,
    minHeight: 640
  })

  win.loadURL(URL)

  win.on('close', e => {
    if (!isQuitting) {
      e.preventDefault()

      if (process.platform === 'darwin') {
        app.hide()
      } else {
        win.hide()
      }
    }
  })
  return win
}

app.on('ready', () => {

  const menu = defaultMenu(app, shell)
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

  mainWindow = createMainWindow()

  const page = mainWindow.webContents

  page.on('dom-ready', () => {
    mainWindow.show()
  })
})

app.on('activate', () => {
  mainWindow.show()
})

app.on('before-quit', () => {
  isQuitting = true
})