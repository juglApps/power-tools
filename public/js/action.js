const methods = require('electron').remote.require('./app/resources/powerFunctions');
const newWindows = require('electron').remote.require('./app/resources/newWindowsFunctions');

var action = null;

function setContent(actionText, actionSelected) {
    action = actionSelected;
    $('#modalTitle').html(actionText + ' Settings');
    $('#actionLabelText').html(actionText + ' in:');
    $('#turnOffNowText').html(' ' + actionText + ' Now');
    $('#hours').val('');
    $('#minutes').val('');
    $('#seconds').val('');
}

$('#shutdownConfirm').click(function () {
    var time = 0;

    if ($('#turnOffNow').is(':checked')) {
        time = 0;
    } else {
        var hours = $('#hours').val();
        var minutes = $('#minutes').val();
        var seconds = $('#seconds').val();
        if (hours) {
            time += hours * 3600;
        }
        if (minutes) {
            time += minutes * 60;
        }
        if (seconds) {
            time += seconds * 1;
        }
    }
    localStorage.setItem('time', time.toString());

    newWindows.openCountDown();

    methods.execAction(function (out) {
    }, time, action);
});



$('#turnOffNow').click(function () {
    if ($('#turnOffNow').is(':checked')) {
        $('#hours').attr('disabled', 'disabled');
        $('#minutes').attr('disabled', 'disabled');
        $('#seconds').attr('disabled', 'disabled');
    } else {
        $('#hours').removeAttr('disabled');
        $('#minutes').removeAttr('disabled');
        $('#seconds').removeAttr('disabled');
    }
});