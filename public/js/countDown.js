var methods = require('electron').remote.require('./app/resources/powerFunctions');
var remote = require('electron').remote;
var main = require('electron').remote.require('./main');

var time = parseInt(localStorage.getItem('time'));
var action = localStorage.getItem('action');
var progressBarInit = 0;

$(document).ready(function () {
    $( ".progress-bar" ).attr('aria-valuenow', 0).attr('aria-valuemax', time);
});

var countDown = setInterval(function () {
    time--;
    progressBarInit++;
    var result = methods.getTime(time);

    $('#countDown').html(action + ' in ' + result['string']);
    progressBar(progressBarInit);
    if (time === 0) {
        clearInterval(countDown);
    }
}, 1000);

function progressBar(progressBarInit) {
    var progressBar = $( ".progress-bar" );
    var totalTime = progressBar.attr('aria-valuemax');

    var percent = (progressBarInit *100) / totalTime;

    progressBar.css('width', percent+'%').attr('aria-valuenow', progressBarInit);
}

$('#cancelAction').click(function () {
    localStorage.setItem('activeCount', 'noActivated');
    methods.cancelAction();
    var window = remote.getCurrentWindow();
    window.close();
    main.createWindow();
});

$('#closeIcon').click(function () {
    localStorage.setItem('activeCount', 'noActivated');
    var window = remote.getCurrentWindow();
    methods.cancelAction();
    window.close();
});

$('#minimizeIcon').click(function () {
    remote.BrowserWindow.getFocusedWindow().minimize();
});