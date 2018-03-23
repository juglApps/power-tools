const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
var constants = require('./../lib/constants');


const path = require('path');
const url = require('url');
var win;

exports.openCountDown = function () {
    win = new BrowserWindow({
        width: 200,
        height: 300,
        frame: false,
        resizable: false,
        transparent: true,
        backgroundColor: '#222222',
        show: false
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../../public/views/countDown.html'),
        protocol: 'file',
        slashes: true
    }));
    win.setAlwaysOnTop(true);
    if(!constants.PRODUCTION){
        win.webContents.openDevTools();
    }
    win.once('ready-to-show', function () {
        win.show();
    });
};