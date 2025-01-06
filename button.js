const Button = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor) {
    this.name = name;
    this.text = text;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
    this.bgColor = bgColor;
    this.width = x1 - x0;
    this.height = y1 - y0;
    this.fontsize = fontsize;
    this.active = false;
}
Button.prototype.draw = function () {
    //Invert the colors if active.
    if (!this.active) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.bgColor;
    } else {
        ctx.strokeStyle = this.bgColor;
        ctx.fillStyle = this.color;
    }
    ctx.strokeWidth = 2;
    /* Rectangle */
    ctx.fillRect(this.x0, this.y0, this.width, this.height);    
    ctx.strokeRect(this.x0, this.y0, this.width, this.height);
    /* center the text*/
    ctx.font = `${this.fontsize}em monospace`;
    let measure = ctx.measureText(this.text);
    let w = measure.actualBoundingBoxRight +
        measure.actualBoundingBoxLeft;
    let h = measure.fontBoundingBoxDescent +
        measure.fontBoundingBoxAscent;
    let tx = this.x0 + (this.width - w) / 2;
    let ty = this.y1 - (this.height - h) / 2;
    if (this.active) {
        ctx.fillStyle = this.bgColor;
    } else {
        ctx.fillStyle = this.color

    }
    ctx.fillText(this.text + '*', tx, ty);
}