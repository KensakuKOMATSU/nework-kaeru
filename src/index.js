const { app, BrowserWindow, shell, session } = require('electron')

let mainWindow = null

const createWindow = () => {
  const filter = {
    urls: ["http://*/*", "https://*/*"]
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders["Origin"] = "https://nework.app";
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  })

  mainWindow = new BrowserWindow({width: 1280, height: 720});
  mainWindow.loadURL('https://nework.app/workspaces/');
  // since, nework set X-Frame-Options: deny; , we cannot use iframe technique.
  // mainWindow.loadFile('./main/index.html');
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
