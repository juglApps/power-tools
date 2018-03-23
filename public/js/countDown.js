var methods = require('electron').remote.require('./app/resources/powerFunctions');
var remote = require('electron').remote;

var time = parseInt(localStorage.getItem('time'));
var action = localStorage.getItem('action');
var countDown = setInterval(function(){
    time--;
    var hours = Math.floor( time / 3600 );
    var minutes = Math.floor( (time % 3600) / 60 );
    var seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    var result = hours + ":" + minutes + ":" + seconds;
    $('#countDown').html(result);
    if(time === 0){
        clearInterval(countDown);
    }
}, 1000);

$('#cancelAction').click(function () {
    methods.cancelAction();
    var window = remote.getCurrentWindow();
    window.close();
});

$('#closeIcon').click(function () {
    var window = remote.getCurrentWindow();
    window.close();
});

$('#minimizeIcon').click(function () {
    remote.BrowserWindow.getFocusedWindow().minimize();
});