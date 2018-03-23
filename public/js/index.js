const main = require('electron').remote.require('./main.js');
const win = require('electron').remote.require('./app/resources/newWindowsFunctions');
var methods = require('electron').remote.require('./app/resources/powerFunctions');
// const remote = require('electron').remote;
var remote = require('electron').remote;

var isWin = process.platform === "win32";
var isLinux = process.platform === "linux";

$(document).ready(function () {
    $('#modalContent').load('./action.html');
    getSettingsSaved();
});

$('#closeIcon').click(function () {
    var window = remote.getCurrentWindow();
    window.close();
});

$('#minimizeIcon').click(function () {
    remote.BrowserWindow.getFocusedWindow().minimize();
});

function getSettingsSaved() {
    $.getJSON('../../settingsSaved.json', function (data) {
        if (data.length > 0) {
            $('#tableContainer').html(methods.loadSettingsSavedTable(data));
        } else {
            $('#tableContainer').html('<h3>Settings Saved:</h3><div class="alert alert-light text-center">No settings saved</div>');
        }
    });
}

function deleteAction(index){
    $.getJSON('../../settingsSaved.json', function (data) {
        var file = data;
        file.splice(index,1);
        methods.deleteSetting(file);
        $('#tableContainer').html(loadSettingsSavedTable(file));
    });
}

// $('#deleteSavedAction').click(function () {
//     methods.deleteSetting($('#deleteSavedAction').data('index'));
//     remote.getCurrentWindow().reload();
// });

function setAction(id) {
    localStorage.removeItem('action');
    switch (id) {
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
        case 'hibernateContainer':
            // localStorage.setItem('action', 'signOut');
            setContent('Hibernate', 'hibernate');
            break;
        // case 'shutdownAction':
        //     break;
        // case 'shutdownAction':
        //     break;
        // case 'shutdownAction':
        //     break;
    }
}
