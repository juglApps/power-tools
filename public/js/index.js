const main = require('electron').remote.require('./main.js');
const win = require('electron').remote.require('./app/resources/newWindowsFunctions');
var isWin = process.platform === "win32";
var isLinux = process.platform === "linux";

$(document).ready(function () {
    $('#modalContent').load('./action.html');
    getSettingsSaved();
});

function getSettingsSaved() {
    $.getJSON('../../settingsSaved.json', function (data) {
        if(data.length > 0){
            $('#tableContainer').html(loadSettingsSavedTable(data));
        }else{
            $('#tableContainer').html('<h3>Settings Saved:</h3><div class="alert alert-light text-center">No settings saved</div>');
        }
    });
}

function loadSettingsSavedTable(settingsSaved) {
    var html = '<h4>Settings Saved:</h4>';

    html += '<div class="table100 ver3 m-b-110">';
    html += '<div class="table100-head">';
    html += '<table>'; //class="table-settings-saved"
    html += '<thead>';
    html += '<tr class="row100 head">';
    html += '<th class="cell100 column1">Name</th>';
    html += '<th class="cell100 column2">Execute in</th>';
    html += '<th class="cell100 column3">Action</th>';
    html += '<th class="cell100 column4"></th>';
    html += '</tr>';
    html += '</thead>';
    html += '</table>';
    html += '</div>';

    html += '<div class="table100-body js-pscroll">';
    html += '<table>';
    html += '<tbody>';
    for (var i = 0; i < settingsSaved.length; i++) {
        html += '<tr class="row100 body">';
            html += '<td class="cell100 column1">' + settingsSaved[i]['name'] + '</td>';
            html += '<td class="cell100 column2">' + settingsSaved[i]['time'] + '</td>';
            html += '<td class="cell100 column3">' + settingsSaved[i]['action'] + '</td>';
            html += '<td class="cell100 column4">';
            html += '<i class="fa fa-play" id="executeSavedAction" title="Execute"></i>';
            html += '<i class="fa fa-edit" id="editSavedAction" title="Edit"></i>';
            html += '<i class="fa fa-trash" id="deleteSavedAction" title="Delete"></i>';
            html += '</td>';
        html += '</tr>';
    }
    html += '</tbody><table>';
    html += '</div>';
    html += '</div>';

    return html;
}

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
