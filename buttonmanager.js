const ButtonManager = function () {
    this.buttons = {};
    this.radioGroups = {};
    this.panels = {};
    //this is not a list of all togglable buttons, 
    //but if the button is in here, then its toggled..
    //should be removed from here if it is no longer toggled.
    this.toggled = new Map();
    this.pressed = null;
    this.hovered = null;
}
ButtonManager.prototype.addPanel = function (panel) {
    panel.buttons.forEach(button => {
        if (panel.radioGroup) {
            let groupName = panel.radioGroup
            this.addButtonToRadioGroup(button, panel.radioGroup);
        } else {
            this.addButton(button);
        }
    });
    this.panels[panel.name] = panel;
}
ButtonManager.prototype.removePanel = function (panelName) {
    let panelNames = Object.getOwnPropertyNames(this.panels);
    if (panelNames.includes(panelName)) {
        let panel = this.panels[panelName];
        panel.buttons.forEach(button => {
            this.removeButton(button);
        });
        delete this.panels[panelName];
    } else {
        throw Error(`cannot remove panel '${panelName}', not found.`)
    }
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
    if (Object.getOwnPropertyNames(this.radioGroups).includes(groupName)) {
        let group = this.radioGroups[groupName];
        if (group) {
            group.forEach(button => {
                delete this.buttons[button.name];
            });
        }
        delete this.radioGroups[groupName];
    } else {
        throw Error(`cannot remove radiogroup ${groupName}, not found.`);
    }
}
ButtonManager.prototype.addButton = function (button) {
    button.manager = this;
    this.buttons[button.name] = button;
    //TODO:  What is this code supposed to be doing?
    //if (button.isToggle) {
    //    this.toggled = new Map();
    // }
}
ButtonManager.prototype.removeButton = function (buttonName) {
    if (this.buttons[buttonname]) {
        delete this.buttons[buttonName];
    } else {
        throw Error(`button ${button.name} not found`);
    }
}
ButtonManager.prototype.draw = function () {
    Object.getOwnPropertyNames(this.panels).forEach(panelName => {
        let panel = this.panels[panelName];
        let x0 = panel.x;
        let y0 = panel.y;
        let x1 = panel.x + panel.width;
        let y1 = panel.y + panel.height;
        drawBox(panel.x, panel.y, panel.x + panel.width, panel.y + panel.height, panel.bgColor, true);
    });
    Object.getOwnPropertyNames(this.buttons).forEach(buttonName => {
        this.buttons[buttonName].draw();
    });
}
ButtonManager.prototype.check = function () {
    let found = false;
    Object.getOwnPropertyNames(this.buttons).forEach((buttonName) => {
        let button = this.buttons[buttonName];
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
                    //Its in a radio group, so untoggle all the others..
                    let buttonsInGroup = this.radioGroups[button.radioGroup];
                    for (let i = 0; i < buttonsInGroup.length; i++) {
                        let radioButton = buttonsInGroup[i];
                        if (radioButton !== button) {
                            if (this.toggled.has(radioButton)) {
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