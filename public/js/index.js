const main = require('electron').remote.require('./main.js');
const win = require('electron').remote.require('./app/resources/newWindowsFunctions');
var isWin = process.platform === "win32";
var isLinux = process.platform === "linux";

$(document).ready(function() {
    $('#modalContent').load('./action.html');
});

function setAction(id) {
    localStorage.removeItem('action');
    switch (id){
        case 'offContainer':
            // localStorage.setItem('action', 'shutdown');
            setContent('Shutdown', 'shutdown');
            break;
        case 'rebootContainer':
            // localStorage.setItem('action', 'reboot');
            setContent('Reboot', 'reboot');
            break;
        case 'signOutContainer':
            // localStorage.setItem('action', 'signOut');
            setContent('Sign Out', 'signOut');
            break;
        // case 'shutdownAction':
        //     break;
        // case 'shutdownAction':
        //     break;
        // case 'shutdownAction':
        //     break;
    }
}
