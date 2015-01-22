//Bootstrap Dropdown Select
//v 1.0
//Adds ability to type letters in with Bootstrap dropdown open, jumping
//to items starting with letters pressed

function SetupDropdownSelect(buttonName, dropdownName) {
    //handle the user pressing keys while inside the dropdown by highlighting ones that match the keys
    //they press. the string of keys they've pressed resets whenenver a dropdown box gets focus
    $('#' + buttonName + ', #' + dropdownName).keypress(function (e) {
        if (!$('#' + dropdownName).parent().hasClass('open')) {
            $('#' + buttonName).click();
        }

        var previousKeysPressed = $('#' + dropdownName).attr('data-keyspressed');

        var keyPressed = String.fromCharCode(e.which).toLowerCase();

        var currentKeysPressed = previousKeysPressed + keyPressed;

        $('#' + dropdownName).attr('data-keyspressed', previousKeysPressed + keyPressed);

        //loop through the dropdown and find the item that matches what the user has typed in so far
        $('#' + dropdownName + ' li a').each(function () {
            if ($(this).text().substring(0, currentKeysPressed.length).toLowerCase() == currentKeysPressed) {
                $(this).focus();
            }
        });
    });

    //handle key actions "enter", "tab", and "space" from interfering with the dropdown
    $('#' + buttonName + ', #' + dropdownName).keydown(function (e) {

        //let the tab presses pass through
        if (e.which == 9) {
            return;
        }

        //if we are pressing enter or space and the dropdown is closed, open it
        //catch the key and don't let the browser do anything afterwards
        if ((e.which == 13 || e.which == 32) && !$('#' + dropdownName).parent().hasClass('open')) {
            $('#' + buttonName).click();
            return false;
        }

        //if we are pressing enter and the dropdown is open, click the item that has focus to select it
        //let the key pass through
        else if (e.which == 13) {
            $('#' + dropdownName + ' li:focus').click();
            return;
        }
    });

    //reset the keys pressed when a new textbox is put in focus
    $('#' + buttonName).focus(function () {
        keysPressed = '';
        $('#' + dropdownName).attr('data-keyspressed', '');
    });
}