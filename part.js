const Part = function (sprite, offset, orientation) {
    this.sprite = sprite;
    this.orientation = (orientation) ? orientation : 0;
    this.owner = undefined;
    this.offset = (offset) ? new Point(offset.x, offset.y).toVector() : new Vector(0, 0);
}
//offset parameter is the "owners" screen coordinates.
Part.prototype.draw = function (offset, scale) {
    let partLocation = {
        x: offset.x + cos(this.offset.angle+this.owner.angle) * this.offset.length / scale,
        y: offset.y + sin(this.offset.angle+this.owner.angle) * this.offset.length / scale
    };
    let orientation = this.orientation + this.owner.angle;
    this.sprite.draw(scale, orientation, partLocation);
}