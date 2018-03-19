const main = require('electron').remote.require('./main.js');
const win = require('electron').remote.require('./app/resources/newWindowsFunctions');
var isWin = process.platform === "win32";
var isLinux = process.platform === "linux";

// var button = document.createElement('button');
// button.textContent = "Open Window";
// document.body.appendChild(button);

$(document).ready(function() {
    $('#shutdownContent').load('./shutdown.html');
});



// button.addEventListener('click', function () {
//     // modals.openModalConfirmShutdown();
// });

// $('#cancel').click(function () {
//     console.log('Cancel');
// });