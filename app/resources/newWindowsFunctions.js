const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
var win;

exports.openCountDown = function () {
    win = new BrowserWindow({ width: 200, height: 100});
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/views/countDown.html'),
        protocol: 'file',
        slashes: true
    }));
    win.setAlwaysOnTop(true);
    // win.webContents.openDevTools();
};