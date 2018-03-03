console.log('Run successfully!!');

const electron = require('electron');
const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');
var os = require('os');
var exec = require('child_process').exec;

let win;

app.on('ready', createWindow);

exports.getOS = function (os) {
    console.log(os);
};

function createWindow() {
  win = new BrowserWindow({ with: 800, height: 600 });
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/app/views/index.html'),
    protocol: 'file',
    slashes: true
  }));
}

exports.openWindow = function (callback) {
    console.log('Apagando el equipo');
    exec('shutdown -s -t 0', function(error, stdout, stderr){ callback(stdout); });
};

exports.openModalConfirmShutdown = function () {
    win = new BrowserWindow({ with: 300, height: 100 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'openModalConfirmShutdown.html'),
        protocol: 'file',
        slashes: true,
        modal:true
    }));
};


