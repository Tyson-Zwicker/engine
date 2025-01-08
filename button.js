const Button = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action) {
    this.name = name;
    this.text = text;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
    this.bgColor = bgColor;
    this.hColor = hColor;
    this.hbgColor = hbgColor;
    this.width = x1 - x0;
    this.height = y1 - y0;
    this.fontsize = fontsize;
    this.action = action;
    this.manager = null;
}
Button.prototype.selectColor = function (){
    let border = undefined;
    let text = undefined;
    let bg = undefined;
    if (this.manager.hovered === this) {
        if (this.manager.pressed === this) {
            border = this.bgColor;
            text = border;
            bg = this.color;
        } else {
            border = this.color;
            text = border;
            bg = this.bgColor;
        }
    } else {
        border = this.hColor;
        text = border;
        bg = this.hbgColor;
    }
    return {'border':border,'text':text, 'bg':bg};
}
Button.prototype.draw = function () {
    let colors = this.selectColor();
    let mx = this.x0+(this.x1-this.x0)/2;
    let my = this.y0+(this.y1-this.y0)/2;
    drawBox (this.x0,this.y0, this.x1, this.y1,colors.bg,true);
    drawBox (this.x0,this.y0, this.x1, this.y1,colors.bg,false,3);
    drawTextCenter (mx,my,this.text, 1,colors.text);
}
const ButtonManager = function (buttonList) {
    this.buttons = [];
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
        if (bounded(mouse.move.where, button)) {
            found = true;
            if (mouse.buttonDown === false && this.hovered !== button) { //a _newly_ hovered button
                this.hovered = button;
                this.pressed = null;    //means whatever was pressed is free.
            }
            else if (mouse.buttonDown === true && this.hovered === button) {
                //The button was pressed while it hovered on this button..
                this.pressed = button;
            }
            else if (mouse.buttonDown === false && this.pressed === button) {
                //The button was raised onthe same button it went down on..
                button.action();
                this.pressed = null;
            }
        }
    });
    if (!found) {
        //The mouse isn't over anything, so nothing can be touched or hovered.
        this.hovered = null;
        this.pressed = null;
    }
}