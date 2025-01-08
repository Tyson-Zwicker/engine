const SpriteLine = function (x0, y0, x1, y1, color, thickness) {
    this.v1 = new Vector(
        Math.atan2(y0, x0),
        Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2))
    );
    this.v2 = new Vector(
        Math.atan2(y1, x1),
        Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2))
    );
    this.color = (color) ? color : '#fff';
    this.thickness = (thickness) ? thickness : 1;
}
SpriteLine.prototype.draw = function (scale, rotation, offset) {
    drawLine (
        cos(this.v1.angle + rotation) * this.v1.length * scale + offset.x,
        sin(this.v1.angle + rotation) * this.v1.length * scale + offset.y,
        cos(this.v2.angle + rotation) * this.v2.length * scale + offset.x,
        sin(this.v2.angle + rotation) * this.v2.length * scale + offset.y,
        this.thickness, 
        this.color
    );    
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.strokeWidth = this.thickness;
}
const Sprite = function (lines) {
    this.lines = (lines) ? lines : [];
}
Sprite.prototype.draw = function (offset, scale, rotation) {    
    this.lines.forEach((line) => { line.draw(offset, scale, rotation) });
}