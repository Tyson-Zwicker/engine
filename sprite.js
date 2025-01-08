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
    let p0 = this.v1.toPoint();
    let p1 = this.v2.toPoint();
    drawLine (
        p0.x+offset.x,
        p0.y+offset.y,
        p1.x+offset.x,
        p1.y+offset.y,
        this.thickness, 
        this.color
    );
    /*drawLine (
        cos(this.v1.angle + rotation) * this.v1.length * scale + offset.x,
        sin(this.v1.angle + rotation) * this.v1.length * scale + offset.y,
        cos(this.v2.angle + rotation) * this.v2.length * scale + offset.x,
        sin(this.v2.angle + rotation) * this.v2.length * scale + offset.y,
        this.thickness, this.color
    );
    */
}
const Sprite = function (lines) {
    this.lines = (lines) ? lines : [];
}
Sprite.prototype.draw = function (offset, scale, rotation) {    
    this.lines.forEach((line) => { line.draw(offset, scale, rotation) });
}