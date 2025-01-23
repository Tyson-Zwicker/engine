const ButtonManager = function () {
    this.buttons = [];
    this.radioGroups = {}
    this.toggled = new Map();
    this.pressed = null;
    this.hovered = null;
}
ButtonManager.prototype.addButtonToRadioGroup = function (button, groupName) {
    let group = [];
    if (Object.getOwnPropertyNames(this.radioGroups).includes(groupName)) {
        group = this.radioGroups[groupName];
    } else {
        this.radioGroups[groupName] = group;
    }
    button.radioGroup = groupName;
    group.push(button);
    this.addButton(button);
}
ButtonManager.prototype.removeRadioGroup = function (groupName) {
    let group = this.radioGroups[groupName];
    if (group) {
        group.forEach(button => {
            button.radioGroup = false;
        });
    }
    delete this.radioGroups[groupName];
}
ButtonManager.prototype.addButton = function (button) {
    button.manager = this;
    this.buttons.push(button);
    if (button.isToggle) {
        this.toggled = new Map();
    }
}
ButtonManager.prototype.removeButton = function (button) {
    let del = -1;
    for (let i = 0; i < this.buttons.length; i++) {
        if (this.buttons[i] = button) {
            del = i;
        }
    }
    if (del !== -1) {
        this.buttons.splice(del, 1);
    }
}
ButtonManager.prototype.draw = function () {
    this.buttons.forEach(button => {
        button.draw();
    });
}
ButtonManager.prototype.check = function () {
    let found = false;
    this.buttons.forEach((button) => {
        if (bounded(_mouse.move.where, button)) {
            found = true;
            if (_mouse.buttonDown === false && this.hovered !== button) {
                //a _newly_ hovered button 
                this.hovered = button;
                this.pressed = null;    //means whatever was pressed is free.
            }
            else if (_mouse.buttonDown === true && this.hovered === button) {
                //The button was pressed while it hovered on this button..
                this.pressed = button;
            }
            else if (_mouse.buttonDown === false && this.pressed === button) {
                //The button was raised onthe same button it went down on..
                button.actionFn();
                this.pressed = null;
                if (button.radioGroup) {
                    this.toggled.set(button, true);
                    console.log(`radio button ${button.name} of group ${button.radioGroup} toggled`);
                    //Its in a radio group, so untoggle all the others..
                    let buttonsInGroup = this.radioGroups[button.radioGroup];
                    for (let i = 0; i < buttonsInGroup.length; i++) {
                        let radioButton = buttonsInGroup[i];
                        if (radioButton !== button) {
                            console.log(`other button in group${radioButton.name}`);
                            if (this.toggled.has(radioButton)) {
                                console.log('was toggled on, shutting off');
                                this.toggled.delete(radioButton);
                            }
                        }
                    }
                }
                if (button.isToggle) {              //If its a toggle
                    if (this.toggled.has(button)) { //and its already toggledfn
                        this.toggled.delete(button);//Untoggled it.
                        if (button.unToggleFn) {
                            button.unToggleFn();
                        }
                    } else {                        //Its a toggle not toggled- toggle it
                        //The value doesn't matter, just presence of the key.
                        this.toggled.set(button, true);
                    }
                }
            }
        }
    });
    if (!found) {
        //The _mouse isn't over anything, so nothing can be touched or hovered.
        this.hovered = null;
        this.pressed = null;
    }
    return found;
}