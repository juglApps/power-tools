console.log('Run successfully!!');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
// const win = require(path.join(__dirname + '/app/resources/newWindowsFunctions'));
var indexWin;
function createWindow() {
    indexWin = new BrowserWindow({ backgroundColor: '#36393e', with: 600, height: 400 });
    indexWin.loadURL(url.format({
        pathname: path.join(__dirname, '/public/views/index.html'),
        protocol: 'file',
        slashes: true
    }));
}

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


