const ButtonManager = function (buttonList) {
    this.buttons = [];
    this.toggled = new Map();
    this.pressed = null;
    this.hovered = null;
    if (buttonList) {
        buttonList.forEach(button => {
            button.manager = this;
            this.buttons.push(button);
        });
    }
}
ButtonManager.prototype.addButton = function (button) {
    button.manager = this;
    this.buttons.push(button);
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
            if (_mouse.buttonDown === false && this.hovered !== button) { //a _newly_ hovered button
                this.hovered = button;
                this.pressed = null;    //means whatever was pressed is free.
            }
            else if (_mouse.buttonDown === true && this.hovered === button) {
                //The button was pressed while it hovered on this button..
                this.pressed = button;
            }
            else if (_mouse.buttonDown === false && this.pressed === button) {
                //The button was raised onthe same button it went down on..
                button.action();
                this.pressed = null;
                if (button.toggle) {                //If its a toggle
                    if (this.toggled.has(button)) { //and its already toggledf
                        this.toggled.delete(button); //Untoggled it.
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