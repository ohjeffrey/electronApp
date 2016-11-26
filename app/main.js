(function () {
  'use script';

  const os = require('os');
  const fs = require('fs');
  const path = require('path');
  const notifier = require('node-notifier');
  const devMode = require('electron-is-dev');
  const {app, autoUpdater, dialog, globalShortcut, ipcMain, shell, BrowserWindow, Menu} = require('electron');
  const version = app.getVersion();
  const platform = os.platform();
  const app_config = require('./lib/config.js');
  const appIcon = '/dist/assets/images/gulp.png';
  require('electron-dl')();
  require('electron-context-menu')();

  let mainWindow;
  let isQuitting = false;

  ipcMain.on('dialog', function () {
    dialog.showMessageBox({
      buttons: ['ok', 'cancel'],
      message: 'Do you want to exit?'
    }, function (index) {
      if (index === 0) {
        app.quit();
      }
    });
  });

  if (!devMode) {
    //auto updates work when app is signed
    autoUpdater.setFeedURL(`https://localhost:3000/update/${platform}?version=${version}`);
  }

  app.on('ready', () => {
    mainWindow = createMainWindow();
    const app_page = mainWindow.webContents;
    Menu.setApplicationMenu(require('./lib/menu.js'));

    app_page.on('dom-ready', () => {
      mainWindow.show();
      autoUpdater.checkForUpdates();

      // Open external links in browser
      app_page.on('new-window', (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
      });

      // Shortcut to reload the page.
      globalShortcut.register('CmdOrCtrl+R', (item, focusedWindow) => {
        if (focusedWindow) {
          mainWindow.webContents.reload();
        }
      });
      // Shortcut to go back a page.
      globalShortcut.register('Command+Left', (item, focusedWindow) => {
        if (focusedWindow && focusedWindow.webContents.canGoBack()) {
          focusedWindow.webContents.goBack();
          focusedWindow.webContents.reload();
        }
      });

      // Navigate the window back when the user hits their mouse back button
      mainWindow.on('app-command', (e, cmd) => {
        if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
      });
    });
  });

  app.on('window-all-closed', () => {
    app.quit();
  });

  app.on('activate', () => {
    mainWindow.show();
  });

  app.on('before-quit', () => {
    globalShortcut.unregisterAll();

    // Saves the current window position and window size to the config file.
    if (!mainWindow.isFullScreen()) {
      app_config.set('lastWindowState', mainWindow.getBounds());
    }
  });

  //Auto updates
  autoUpdater.addListener("update-available", () => {
    notifier.notify({
      'title': 'Updates',
      'message': 'A new update is available',
      'icon': appIcon
    });
  });

  autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName, releaseDate, updateURL) => {
    notifier.notify({
      'title': 'Updates',
      'message': `Version ${releaseName} is downloaded and will be automatically installed on Quit`,
      'icon': appIcon
    });
    autoUpdater.quitAndInstall();
    return true;
  });

  autoUpdater.addListener("error", () => {
    notifier.notify({
      'title': 'Updates',
      'message': 'Error encountered whiles getting update',
      'icon': appIcon
    });
  });

  autoUpdater.addListener("checking-for-update", () => {
    notifier.notify({
      'title': 'Updates',
      'message': 'Checking for new update',
      'icon': appIcon
    });
  });

  autoUpdater.addListener("update-not-available", () => {
    notifier.notify({
      'title': 'Updates',
      'message': 'No new update available',
      'icon': appIcon
    });
  });

  function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const browser = new BrowserWindow({
      title: app.getName(),
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
          app.hide();
        } else {
          app.quit();
        }
      }
    });
    return browser;
  }

})();