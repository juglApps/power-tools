const main = require('electron').remote.require('./main.js');
const win = require('electron').remote.require('./app/resources/newWindowsFunctions');
var newWindows = require('electron').remote.require('./app/resources/newWindowsFunctions');
var methods = require('electron').remote.require('./app/resources/powerFunctions');
// const remote = require('electron').remote;
var remote = require('electron').remote;

var isWin = process.platform === "win32";
var isLinux = process.platform === "linux";

$(document).ready(function () {
    $('#modalContent').load('./action.html');
    localStorage.setItem('activeCount', 'noActivated');
    getSettingsSaved();
    setTimeout(function () {
        $('#closeMinContainer').css('display', 'flex');
        $('#full-container').fadeIn();
        $('#tableContainer').fadeIn();
        $('.loader').hide();
    }, 3000);
});

$('#closeIcon').click(function () {
    var window = remote.getCurrentWindow();
    window.close();
});

$('#minimizeIcon').click(function () {
    remote.BrowserWindow.getFocusedWindow().minimize();
});

function getSettingsSaved() {
    var settingsFileExist = methods.existSettingsFile();
    if(settingsFileExist){
        var file = methods.getJsonFile();
        if (file.length > 0) {
            $('#tableContainer').html(methods.loadSettingsSavedTable(file));
        } else {
            $('#tableContainer').html('<h3>Settings Saved:</h3><div class="alert alert-light text-center">No settings saved</div>');
        }
    }else{
        $('#tableContainer').html('<h3>Settings Saved:</h3><div class="alert alert-light text-center" style="border: 0">No settings saved</div>');
    }
}

function loadAction(index){
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount !== 'activated'){
        var file = methods.getJsonFile();
        var settingsSaved = file[index];
        localStorage.setItem('time', settingsSaved['time'].toString());
        localStorage.setItem('action', settingsSaved['action']);
        localStorage.setItem('activeCount', 'activated');

        newWindows.openCountDown();
        remote.BrowserWindow.getFocusedWindow().close();

        methods.execAction(function (out) {}, settingsSaved['time'], settingsSaved['action'], false, null, index);
    }
}

function editAction(index){
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount !== 'activated'){
        $('#myModal').modal('show');
        var file = methods.getJsonFile();
        var settingsSaved = file[index];
        var timeObj = methods.getTime(settingsSaved['time']);
        setAction(settingsSaved['action'], settingsSaved, timeObj, index);
    }
}

function check(node) {
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount === 'activated'){
        node.css('cursor','not-allowed');
    }else{
        node.css('cursor','pointer');
    }
}

function deleteAction(index){
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount !== 'activated'){
        var file = methods.getJsonFile();
        file.splice(index,1);
        methods.deleteSetting(file);
        if (file.length > 0) {
            $('#tableContainer').html(methods.loadSettingsSavedTable(file));
        } else {
            $('#tableContainer').html('<h3>Settings Saved:</h3><div class="alert alert-light text-center" style="border: 0">No settings saved</div>');
        }
    }
}

function setAction(id, settingsSaved, timeObj, index) {
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount !== 'activated'){
        $('#myModal').modal('show');
        switch (id) {
            case 'offContainer':
            case 'shutdown':
                setContent('Shutdown', 'shutdown', settingsSaved, timeObj, index);
                break;
            case 'rebootContainer':
            case 'reboot':
                setContent('Reboot', 'reboot', settingsSaved, timeObj, index);
                break;
            case 'signOutContainer':
            case 'signOut':
                setContent('Sign Out', 'signOut', settingsSaved, timeObj, index);
                break;
            case 'hibernateContainer':
            case 'hibernate':
                setContent('Hibernate', 'hibernate', settingsSaved, timeObj, index);
                break;
        }
    }
}
