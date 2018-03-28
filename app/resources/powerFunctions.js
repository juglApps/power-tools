var exec = require('child_process').exec;
var fs = require('fs');

var actionInProgress = null;

exports.execAction = function (callback, time, action, saveSettings, nameSetting, index) {
    console.log('Apagando el equipo');
    if (saveSettings) {
        saveFileSettings(time, nameSetting, action, index, function (out) {
            callback(out);
        });
    } else {
        switch (action) {
            case 'shutdown':
                execute(callback, time, 'shutdown -s -f -t 0');
                break;
            case 'reboot':
                execute(callback, time, 'shutdown -r -f -t 0');
                break;
            case 'signOut':
                execute(callback, time, 'shutdown -L -f');
                break;
            case 'hibernate':
                execute(callback, time, 'shutdown -h -f -t 0');
                break;
        }
    }

};

exports.cancelAction = function () {
    console.log('Cancelando Acción');
    clearTimeout(actionInProgress);
};

exports.deleteSetting = function (file) {
    console.log('Borrando Acción');
    fs.writeFile("settingsSaved.json", JSON.stringify(file));
};

function execute(callback, time, action) {
    if (time > 0) {
        actionInProgress = setTimeout(function () {
            exec(action, function (error, stdout, stderr) {
                callback(stdout);
            });
        }, time * 1000);
    } else {
        exec(action, function (error, stdout, stderr) {
            callback(stdout);
        });
    }
}

function saveFileSettings(time, nameSetting, action, index, callback) {
    var JsonFile = getJsonFile();
    var path = './settingsSaved.json';
    var fileArray = JsonFile ? JsonFile : [];
    if (index === 0 || index > 0) {
        fileArray[index] = {
            'name': nameSetting,
            'time': time,
            'action': action
        }
    } else {
        fileArray.push({
            'name': nameSetting,
            'time': time,
            'action': action
        });
    }
    runCommand(path, fileArray, action, time, function (out) {
        callback(out);
    });
}

function runCommand(path, fileArray, action, time, callback) {
    fs.writeFile(path, JSON.stringify(fileArray), function (err) {
        if (err) {
            callback(err);
        } else {
            switch (action) {
                case 'shutdown':
                    execute(function () {
                        callback('Done');
                    }, time, 'shutdown -s -f -t 0');
                    break;
                case 'reboot':
                    execute(function () {
                        callback('Done');
                    }, time, 'shutdown -r -f -t 0');
                    break;
                case 'signOut':
                    execute(function () {
                        callback('Done');
                    }, time, 'shutdown -L -f');
                    break;
                case 'hibernate':
                    execute(function () {
                        callback('Done');
                    }, time, 'shutdown -h -f -t 0');
                    break;
            }
        }

    });
}

function getJsonFile() {
    var JsonFile = null;
    var path = './settingsSaved.json';
    if (fs.existsSync(path)) {
        JsonFile = JSON.parse(fs.readFileSync(path, 'utf8'));
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

        var time = this.getTime(settingsSaved[i]['time']);

        html += '<tr class="row100 body">';
        html += '<td class="cell100 column1">' + settingsSaved[i]['name'] + '</td>';
        html += '<td class="cell100 column2">' + time['string'] + '</td>';
        html += '<td class="cell100 column3">' + settingsSaved[i]['action'] + '</td>';
        html += '<td class="cell100 column4">';
        html += '<i class="fa fa-play executeSavedAction" onmouseover="check($(this))" id="executeSavedAction' + i + '" title="Execute" onclick="loadAction(' + i + ')"></i>';
        html += '<i class="fa fa-edit editSavedAction" onmouseover="check($(this))" id="editSavedAction' + i + '" onclick="editAction(' + i + ')" title="Edit"></i>';
        html += '<i class="fa fa-trash deleteSavedAction" onmouseover="check($(this))" id="deleteSavedAction' + i + '" onclick="deleteAction(' + i + ')" title="Delete"></i>';
        html += '</td>';
        html += '</tr>';
    }
    html += '</tbody><table>';
    html += '</div>';
    html += '</div>';

    return html;
};

exports.getTime = function (time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return {
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'string': hours + ":" + minutes + ":" + seconds
    };
};

exports.getJsonFile = function () {
    var JsonFile = null;
    var path = './settingsSaved.json';
    if (fs.existsSync(path)) {
        JsonFile = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    return JsonFile;
};

exports.existSettingsFile = function () {
    var path = './settingsSaved.json';
    return fs.existsSync(path);
};