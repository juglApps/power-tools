const main = require('electron').remote.require('./main.js');

let button = document.createElement('button');
button.textContent = "Open Window";
document.body.appendChild(button);

button.addEventListener('click', function () {
    main.openModalConfirmShutdown();
});

$('#shutdown').click(function () {
    main.openWindow(function (out) {

    });
    // console.log('ShutDown');
});

$('#cancel').click(function () {
    console.log('Cancel');
});