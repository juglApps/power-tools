var exec = require('child_process').exec;

var actionInProgress = null;

exports.execAction = function (callback, time, action) {
    console.log('Apagando el equipo');
    switch (action) {
        case 'shutdown':
            execute(callback, time, 'shutdown -s -f -t 0');
            break;
        case 'reboot':
            execute(callback, time, 'shutdown -r -f -t 0');
            break;
        case 'signOut':
            execute(callback, time, 'shutdown -L -f -t 0');
            break;
    }

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

exports.cancelAction = function () {
    console.log('Cancelando Acción');
    clearTimeout(actionInProgress);
};