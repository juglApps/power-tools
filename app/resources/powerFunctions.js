var exec = require('child_process').exec;
var fs = require('fs');

var actionInProgress = null;

exports.execAction = function (callback, time, action, saveSettings, nameSetting) {
    console.log('Apagando el equipo');
    switch (action) {
        // case 'shutdown':
        //     execute(callback, time, 'shutdown -s -f -t 0');
        //     break;
        // case 'reboot':
        //     execute(callback, time, 'shutdown -r -f -t 0');
        //     break;
        // case 'signOut':
        //     execute(callback, time, 'shutdown -L -f -t 0');
        //     break;
        // case 'hibernate':
        //     execute(callback, time, 'shutdown -h -f -t 0');
        //     break;
    }

    if(saveSettings){
        saveFileSettings(time, nameSetting, action);
    }
};

exports.cancelAction = function () {
    console.log('Cancelando Acción');
    clearTimeout(actionInProgress);
};

exports.deleteSetting = function (file) {
    console.log('Borrando Acción');
    // var JsonFile = getJsonFile();
    // JsonFile.splice(index,1);
    fs.writeFile("settingsSaved.json", JSON.stringify(file));
};

function execute(callback, time, action) {
    if(time !== 0){
        actionInProgress = setTimeout(function () {
            exec(action, function (error, stdout, stderr) {
                callback(stdout);
            });
        }, time * 1000);
    }else{
        exec(action, function (error, stdout, stderr) {
            callback(stdout);
        });
    }
}

function saveFileSettings(time, nameSetting, action) {
    var JsonFile = getJsonFile();
    var fileArray = JsonFile ? JsonFile : [];
    fileArray.push({
        'name': nameSetting,
        'time': time,
        'action': action
    });
    fs.writeFile("settingsSaved.json", JSON.stringify(fileArray));
}

function getJsonFile() {
    var JsonFile = null;
    if (fs.existsSync('settingsSaved.json')) {
        JsonFile = JSON.parse(fs.readFileSync('settingsSaved.json', 'utf8'));
    }
    return JsonFile;
}

exports.loadSettingsSavedTable = function (settingsSaved) {
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
        html += '<i class="fa fa-trash" id="deleteSavedAction" onclick="deleteAction(' + i + ')" title="Delete"></i>';
        html += '</td>';
        html += '</tr>';
    }
    html += '</tbody><table>';
    html += '</div>';
    html += '</div>';

    return html;
};