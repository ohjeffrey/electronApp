(function () {
  'use script';

  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  const electron = require('electron');
  const notifier = require('node-notifier');
  const devMode = require('electron-is-dev');
  //const {download} = require('electron-dl');
  const version = electron.app.getVersion();
  const platform = os.platform();
  const app_config = require('./lib/config.js');
  const appIcon = '/dist/assets/images/gulp.png';
  require('electron-context-menu')();

  let mainWindow;
  let isQuitting = false;

  electron.app.on('ready', () => {
    mainWindow = createMainWindow();
    const app_page = mainWindow.webContents;
    electron.Menu.setApplicationMenu(require('./lib/menu.js'));
    electron.autoUpdater.setFeedURL(`http://localhost:3000/update/${platform}?version=${version}`);
    electron.powerSaveBlocker.start('prevent-app-suspension'); //keep running even when system sleeps

    if (devMode) {
      mainWindow.openDevTools();
    }

    app_page.on('dom-ready', () => {
      mainWindow.show();
      electron.autoUpdater.checkForUpdates();

      // Open external links in browser
      app_page.on('new-window', (e, url) => {
        e.preventDefault();
        electron.shell.openExternal(url);
      });
    });
  });

  electron.app.on('activate', () => {
    mainWindow.show();
  });

  electron.app.on('window-all-closed', () => {
    electron.app.quit();
  });

  electron.app.on('before-quit', () => {
    isQuitting = true;
    electron.globalShortcut.unregisterAll();

    // Saves the current window position and window size to the config file.
    if (!mainWindow.isFullScreen()) {
      app_config.set('lastWindowState', mainWindow.getBounds());
    }
  });

  //Auto updates
  electron.autoUpdater.addListener("update-available", () => {
    notifier.notify({
      'title': 'Updates',
      'message': 'A new update is available',
      'icon': appIcon
    });
  });

  electron.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    notifier.notify({
      'title': 'Updates',
      'message': `Version ${releaseName} is downloaded and will be automatically installed on Quit`,
      'icon': appIcon
    });
    isQuitting = true;
    electron.autoUpdater.quitAndInstall();
    return true;
  });

  electron.autoUpdater.addListener("error", (error) => {
    if (!devMode) {
      notifier.notify({
        'title': 'Updates Error',
        'message': error.message,
        'icon': appIcon
      });
    }
  });

  function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const browser = new electron.BrowserWindow({
      title: electron.app.getName(),
      x: lastWindowState.x,
      y: lastWindowState.y,
      width: lastWindowState.width,
      height: lastWindowState.height,
      autoHideMenuBar: true,
      center: true,
      movable: true,
      resizable: true,
      closable: true,
      webPreferences: {
        nodeIntegration: true,
        plugins: true
      }
    });

    browser.loadURL('file://' + __dirname + '/dist/index.html');

    browser.on('close', e => {
      if (mainWindow.isFullScreen()) {
        isQuitting = true;
      }

      if (!isQuitting) {
        e.preventDefault();
        if (platform === 'darwin') {
          electron.app.hide();
        } else {
          electron.app.quit();
        }
      }
    });
    return browser;
  }

})();