var methods = require('electron').remote.require('./app/resources/powerFunctions');
var newWindows = require('electron').remote.require('./app/resources/newWindowsFunctions');
var remote = require('electron').remote;

var action = null;

function setContent(actionText, actionSelected, settingsSaved, timeObj, index) {
    action = actionSelected;
    $('#modalTitle').html(actionText + ' Settings');
    $('#actionLabelText').html(actionText + ' in:');
    $('#turnOffNowText').html(' ' + actionText + ' Now');
    $('#hours').val(timeObj && timeObj['hours'] !== 0 ? timeObj['hours'] : '');
    $('#minutes').val(timeObj && timeObj['minutes'] !== '00' ? timeObj['minutes'] : '');
    $('#seconds').val(timeObj && timeObj['seconds'] !== '00' ? timeObj['seconds'] : '');

    if (settingsSaved) {
        $('#buttonConfirmContainer').html('<button type="button" class="btn btn-success" onclick="shutdownConfirmClick(' + index + ')" id="shutdownConfirm" style="width: 80px">\n' +
            '                        <span class="buttonIcon">\n' +
            '                            <i class="fa fa-check"></i>\n' +
            '                        </span>\n' +
            '                    </button>');
        $('#saveSettings').prop("checked", true);
        $('#nameSettingContainer').show();
        $('#nameSetting').val(settingsSaved['name']);
    } else {
        $('#buttonConfirmContainer').html('<button type="button" class="btn btn-success" onclick="shutdownConfirmClick()" id="shutdownConfirm" style="width: 80px">\n' +
            '                        <span class="buttonIcon">\n' +
            '                            <i class="fa fa-check"></i>\n' +
            '                        </span>\n' +
            '                    </button>');
    }

    if (actionSelected === 'hibernate') {
        $('#alertActivation').show();
    } else {
        $('#alertActivation').hide();
    }
}

function shutdownConfirmClick(index) {
    var activeCount = localStorage.getItem('activeCount');
    if(activeCount === 'noActivated'){
        var time = 0;
        var saveSettings = $('#saveSettings').is(':checked');
        var hours = $('#hours').val();
        var minutes = $('#minutes').val();
        var seconds = $('#seconds').val();
        var nameSetting = $('#nameSetting').val();

        if ($('#turnOffNow').is(':checked')) {
            time = 0;
        } else {
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
        localStorage.setItem('action', action);
        localStorage.setItem('activeCount', 'activated');

        if(time > 0){
            newWindows.openCountDown();
            remote.BrowserWindow.getFocusedWindow().close();
        }

        methods.execAction(function (out) {
            if(out === 'Done'){
                refreshSettingSaved();
            }
        }, time, action, saveSettings, nameSetting, index);

        $('#myModal').modal('toggle');
    }
}

function refreshSettingSaved() {
    var file = methods.getJsonFile();
    $('#tableContainer').html(methods.loadSettingsSavedTable(file));
}

function saveSettingsClick() {
    if ($('#saveSettings').is(':checked')) {
        $('#nameSettingContainer').fadeIn();
    } else {
        $('#nameSettingContainer').fadeOut();
    }
}

function turnOffNowClick() {
    if ($('#turnOffNow').is(':checked')) {
        $('#hours').attr('disabled', 'disabled');
        $('#minutes').attr('disabled', 'disabled');
        $('#seconds').attr('disabled', 'disabled');
    } else {
        $('#hours').removeAttr('disabled');
        $('#minutes').removeAttr('disabled');
        $('#seconds').removeAttr('disabled');
    }
}