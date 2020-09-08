const { app, BrowserWindow, shell } = require('electron')

let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 1280, height: 720});
  //mainWindow.loadURL('https://nework.app/workspaces/');
  mainWindow.loadFile('./main/index.html');
  if( process.env.NODE_ENV==='development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
app.on('ready', createWindow )

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' ) {
    app.quit()
  }
})

app.on('active', () => {
  if( mainWindow === null ) {
    createWindow()
  }
})
