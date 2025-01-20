const Button = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action, toggle, unToggleFn) {
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
    this.isToggle = (toggle) ? toggle : false;
    this.unToggleFn = unToggleFn;
}
Button.prototype.selectColor = function () {
    let border = undefined;
    let text = undefined;
    let bg = undefined;
    if (this.manager.toggled.has(this)){
        border = this.bgColor;
        text = border;
        bg = this.color;
    } else {
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
    }
    return { 'border': border, 'text': text, 'bg': bg };
}
Button.prototype.draw = function () {
    let colors = this.selectColor();
    let mx = this.x0 + (this.x1 - this.x0) / 2;
    let my = this.y0 + (this.y1 - this.y0) / 2;
    drawBox(this.x0, this.y0, this.x1, this.y1, colors.bg, true);
    drawBox(this.x0, this.y0, this.x1, this.y1, colors.bg, false, 3);
    drawTextCenter(mx, my, this.text, this.fontsize, colors.text);
}
