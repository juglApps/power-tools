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

function saveFileSettings(time, nameSetting, action) {
    var JsonFile = null;
    if (fs.existsSync('settingsSaved.json')) {
        JsonFile = JSON.parse(fs.readFileSync('settingsSaved.json', 'utf8'));
    }

    var fileArray = JsonFile ? JsonFile : [];
    fileArray.push({
        'name': nameSetting,
        'time': time,
        'action': action
    });
    fs.writeFile("settingsSaved.json", JSON.stringify(fileArray));
}

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

exports.cancelAction = function () {
    console.log('Cancelando Acción');
    clearTimeout(actionInProgress);
};