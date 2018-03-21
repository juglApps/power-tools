const methods = require('electron').remote.require('./app/resources/powerFunctions');
const newWindows = require('electron').remote.require('./app/resources/newWindowsFunctions');
const remote = require('electron').remote;

var action = null;

function setContent(actionText, actionSelected) {
    action = actionSelected;
    $('#modalTitle').html(actionText + ' Settings');
    $('#actionLabelText').html(actionText + ' in:');
    $('#turnOffNowText').html(' ' + actionText + ' Now');
    $('#hours').val('');
    $('#minutes').val('');
    $('#seconds').val('');
    if(actionSelected === 'hibernate'){
        $('#alertActivation').show();
    }else{
        $('#alertActivation').hide();
    }
}

$('#shutdownConfirm').click(function () {
    var time = 0;
    var saveSettings = $('#saveSettings').is(':checked');

    if ($('#turnOffNow').is(':checked')) {
        time = 0;
    } else {
        var hours = $('#hours').val();
        var minutes = $('#minutes').val();
        var seconds = $('#seconds').val();
        var nameSetting = $('#nameSetting').val();

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
        console.log(out);
    }, time, action, saveSettings, nameSetting);
    remote.getCurrentWindow().reload();
});

$('#saveSettings').click(function () {
    if($(this).is(':checked')){
        $('#nameSettingContainer').fadeIn();
    }else{
        $('#nameSettingContainer').fadeOut();
    }
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