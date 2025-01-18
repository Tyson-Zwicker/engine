const SpriteLine = function (x0, y0, x1, y1, color, thickness) {
    this.v1 = new Vector(
        Math.atan2(y0, x0),
        Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2))
    );
    this.v2 = new Vector(
        Math.atan2(y1, x1),
        Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2))
    );
    this.x0 = x0;   //Rarely used when rendering.
    this.y0 = y0;   //So far the only thing that uses these
    this.x1 = x1;   //is the sprite builder, to avoid the
    this.y1 = y1;   //floating point wierdness from the trig.
    this.color = (color) ? color : '#fff';
    this.thickness = (thickness) ? thickness : 1;
}
SpriteLine.prototype.draw = function (rotation, offset) {
    drawLine(
        cos(this.v1.angle + rotation) * this.v1.length * _zoom + offset.x,
        sin(this.v1.angle + rotation) * this.v1.length * _zoom + offset.y,
        cos(this.v2.angle + rotation) * this.v2.length * _zoom + offset.x,
        sin(this.v2.angle + rotation) * this.v2.length * _zoom + offset.y,
        this.color, this.thickness
    );
    _ctx.beginPath();
    _ctx.strokeStyle = this.color;
    _ctx.strokeWidth = this.thickness;
}
const Sprite = function (lines) {
    this.lines = (lines) ? lines : [];
}
Sprite.prototype.draw = function (rotation, offset) {
    this.lines.forEach((line) => { line.draw(rotation, offset) });
}