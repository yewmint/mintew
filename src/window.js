import { app, BrowserWindow } from 'electron'
import { format } from 'url'

import './index.html'
import './server'

const INDEX_PATH = 'index.html'
const WINDOW_TITLE = 'Mintew'
const WINDOW_WIDTH = 480
const WINDOW_HEIGHT = 800

const HTTP_PATH = format({
  pathname: INDEX_PATH,
  hostname: '127.0.0.1',
  port: '1234',
  protocol: 'http:',
  slashes: true
})

let win

function createWindow () {
  win = new BrowserWindow({
    title: WINDOW_TITLE,
    width: WINDOW_WIDTH, 
    height: WINDOW_HEIGHT,
    resizable: false,
    useContentSize: true,
    autoHideMenuBar: true
  })

  win.loadURL(HTTP_PATH)
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
    app.quit()
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
