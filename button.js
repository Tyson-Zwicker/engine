const Button = function (name, text, x0, y0, x1, y1, fontsize, color) {
    this.name = name;
    this.text = text;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
    this.width = x1 - x0;
    this.height = y1 - y0;
    this.fontsize = fontsize;

}
Button.prototype.draw = function (selected) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.strokeWidth = 2;
    /* Rectangle */
    if (selected) {
        ctx.fillRect(this.x0, this.y0, this.width, this.height);
    } else {
        ctx.rect(this.x0, this.y0, this.width, this.height);
    }
    /* center the text*/    
    ctx.font =`${this.fontsize}em monospace`;
    let measure = ctx.measureText (this.text)
    //console.log (measure);
    let w = measure.actualBoundingBoxRight+
            measure.actualBoundingBoxLeft;
    let h = measure.fontBoundingBoxDescent +
            measure.fontBoundingBoxAscent;
    let tx = this.x0 + (this.width - w)/2;
    let ty = this.y1 - (this.height -h)/2;
    //console.log (this.width, this.height, w, tx, ty);
    ctx.fillText (this.text, tx,ty);
    ctx.closePath();
    ctx.stroke();
}