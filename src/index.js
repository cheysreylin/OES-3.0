const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  globalShortcut,
  screen,
  dialog,
  Menu
} = require('electron')
const path = require('path')
// const ffi = require('ffi');


// // Get the dimensions of the primary display
let screenDimension = null

const options = {
  type: 'warning',
  title: 'Warning Message',
  message: 'We detected inappropriate action, Please do not do it again',
  buttons: ['OK'],
}

// prevent Global short cut
app.on('ready', () => {
  globalShortcut.register('Alt+TAB', function () {
    console.log('Tab+Alt captured!')
  })
  
  globalShortcut.register('CommandOrControl+Alt+Delete', function () {
    console.log('CommandOrControl+Alt+Delete captured!')
  })
  globalShortcut.register('CommandOrControl+R', function () {
    console.log('CommandOrControl+R captured!')
  })
  globalShortcut.register('Alt+F4', function () {
    console.log('Alt+F4 captured!')
  })
  globalShortcut.register('PrintScreen', function () {
    console.log('PrintScreen captured!')
  })
  globalShortcut.register('CommandOrControl+A', function () {
    console.log('CommandOrControl+A captured!')
  })

  globalShortcut.register('CommandOrControl+Shift+I', function () {
    console.log('CommandOrControl+Shift+I captured!')
  })

  globalShortcut.register('Alt+Esc', function () {
    console.log('Alt+Esc captured!')
  })
  globalShortcut.register('Alt+Shift+I', function () {
    console.log('Alt+Shift+I captured!')
  })
  globalShortcut.register('CommandOrControl+R', function () {
    console.log('CommandOrControl+R captured!')
  })
  globalShortcut.register('Command+Tab', function () {
    console.log('Command+Tab captured!')
  })
  // globalShortcut.register('Alt+PrtScn', function () {
  //   console.log('Alt + PrtScn!')
  // })
})

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
})

// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

// Main Window(login/register screen)
let mainWindow
const createWindow = () => {


  BrowserWindow.getAllWindows()
    .filter((win) => win !== mainWindow)
    .forEach((win) => win.close())

  screenDimension = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600, 
    width : 800,
    // titleBarStyle: 'hidden',
    name: 'Online Examination System',
    fullscreen: true,
    alwaysOnTop: true,
    kiosk: false,
    skipTaskbar: true,
    frame: false,
    minimizable: false,
    maximizable: false,
    focusable: true,
    minimizable: false,
    resizable: false,
    autoHideMenuBar: true,
    focusable: true,
   // icon: path.join(__dirname, '/images/kit-logo.png'),
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      nodeIntegration: false,
      contextIsolation: true,
      disableBlinkFeatures: 'Capture Page' // prevent shortcut keys 
    },
  })
  
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  
  })

  // Disable mouse events to prevent screenshots
  //mainWindow.setIgnoreMouseEvents(true),
    

  // Disable the Windows key
  // const menu = Menu.getApplicationMenu();
  // menu.items.forEach(function(menuItem) {
  //   if (menuItem.accelerator === 'Super') {
  //     menuItem.enabled = true;
  //   }
  // });
  
  
  // mainWindow.loadFile(path.join(__dirname, '/screens/lobby.html'))
  mainWindow.setAlwaysOnTop(true, 'screen');
  mainWindow.loadURL("https://forms.gle/EuJcFG9oyZ3fS5UXA")
  mainWindow.setKiosk(true)


  // // catch blur when using shortcut key or screenshot 
  // mainWindow.on('blur', async () => {
  //   // Show a warning
  //   await dialog.showMessageBox(mainWindow, options)
  //   // mainWindow.focusable()
  // })

  let isDialogOpen = false; // Flag variable to track if dialog is open

  mainWindow.on('blur', async () => {
    if (!isDialogOpen) {
      isDialogOpen = true; // Set flag to true to indicate dialog is open
      await dialog.showMessageBox(mainWindow, options);
      isDialogOpen = false; // Reset flag to false when dialog is closed
    }
  });
}


app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})





// // Exam Screen
// let kioskWindow
// let kioskView

// // Handle the button click event in the lobby page
// ipcMain.on('open-kiosk-window', (event) => {
//   // Create the kiosk window
//   kioskWindow = new BrowserWindow({
//     width: screenDimension.width,
//     height: screenDimension.height,
//     frame: false,
//     fullscreen: true,
//     icon: path.join(__dirname, '/images/kit-logo.png'),
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: false,
//       contextIsolation: true,

//     },
    

//   })

//   kioskWindow.loadFile(path.join(__dirname, './screens/kisok_window.html'))
//   kioskWindow.setKiosk(true)
//   kioskWindow.setFullScreen(true)
//   kioskWindow.setAlwaysOnTop(true)

//   // Create the BrowserView and attach it to the kiosk window
//   kioskView = new BrowserView({
//     alwaysOnTop: true,
//   })
//   kioskWindow.setBrowserView(kioskView)
//   kioskView.setBounds({
//     x: 0,
//     y: 3,
//     width: screenDimension.width * 0.85,
//     height: screenDimension.height,
//   })
//   kioskView.webContents.loadURL('https://forms.gle/YtFUbupwhdMLvvVX8')

//   kioskWindow.on('blur', async () => {
//     // Show a warning
//     kioskWindow.focus()
//     await dialog.showMessageBox(kioskWindow, options)
//   })
// })

// // Handle the button click event in the kiosk window
// ipcMain.on('close-kiosk-window', (event) => {
//   kioskWindow.close()
// })
