const ButtonColors = function ( color, bgColor, hColor, hbgColor){
    this.color = color;
    this.bgColor = bgColor;
    this.hoverColor= hColor;
    this.hoverBackground =hbgColor;
}

const Button = function (name, text, x0, y0, x1, y1, fontsize, buttonColors, actionFn) {
    this.name = name;
    this.text = text;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.colors = buttonColors;
    this.width = x1 - x0;
    this.height = y1 - y0;
    this.fontsize = fontsize;
    this.actionFn = actionFn;
    this.manager = null;
    this.isToggle = false;
    this.radioGroup = null;
    this.unToggleFn = null;
}
Button.prototype.setAsToggle = function (untoggleFn){
    this.isToggle = true;
    this.unToggleFn = untoggleFn;
}
Button.prototype.selectColor = function () {
    let border = undefined;
    let text = undefined;
    let bg = undefined;
    if (this.manager.toggled[this.name]){
        //toggled same as pressed
        border = this.colors.hoverBackground;
        text = border;
        bg = this.colors.hoverColor;
    } else {
        if (this.manager.hovered === this) {
            if (this.manager.pressed === this) {
                //pressed
                border = this.colors.hoverBackground;
                text = border;
                bg = this.colors.hoverColor;
            } else {
                //hovered
                border = this.colors.hoverColor;
                text = border;
                bg = this.colors.hoverBackground;
            }
        } else {
            //normal
            border = this.colors.color;
            text = border;
            bg = this.colors.bgColor;
        }
    }
    return { 'border': border, 'text': text, 'bg': bg };
}
Button.prototype.draw = function () {
    let colors = this.selectColor();
    let mx = this.x0 + (this.x1 - this.x0) / 2;
    let my = this.y0 + (this.y1 - this.y0) / 2;
    drawBox(this.x0, this.y0, this.x1, this.y1, colors.bg, true);
    drawBox(this.x0, this.y0, this.x1, this.y1, colors.border, false, 1);
    drawTextCenter(mx, my, this.text, this.fontsize, colors.text);
}
