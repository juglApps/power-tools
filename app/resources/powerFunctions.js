var exec = require('child_process').exec;

exports.execAction = function (callback, time, action) {
    console.log('Apagando el equipo');
    exec(action + ' -s -t ' + time, function(error, stdout, stderr){ callback(stdout); });
};

exports.cancelAction = function (callback, action) {
    console.log('Cancelando Acción');
    exec(action + ' -a', function(error, stdout, stderr){ callback(stdout); });
};