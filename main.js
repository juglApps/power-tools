console.log('Run successfully!!');

const electron = require('electron');
var constants = require('./app/lib/constants');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
// const win = require(path.join(__dirname + '/app/resources/newWindowsFunctions'));
var indexWin;

function createWindow() {
    indexWin = new BrowserWindow({
        backgroundColor: '#222222', with: 600, height: 600, show: false,frame: false,
        resizable: false,
        fullscreen: false
    });
    indexWin.loadURL(url.format({
        pathname: path.join(__dirname, '/public/views/index.html'),
        protocol: 'file',
        slashes: true
    }));
    indexWin.once('ready-to-show', function () {
        indexWin.show();
    });
    if(!constants.PRODUCTION){
        indexWin.webContents.openDevTools();
    }
}

exports.createWindow = function () {
    createWindow();
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});


