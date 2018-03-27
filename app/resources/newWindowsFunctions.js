const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
var constants = require('./../lib/constants');


const path = require('path');
const url = require('url');
var win;

exports.openCountDown = function () {
    win = new BrowserWindow({
        width: 200,
        height: 100,
        frame: false,
        resizable: false,
        transparent: true,
        backgroundColor: '#222222',
        show: false,
        fullscreen: false
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
    win.setPosition(50,50,true);
};