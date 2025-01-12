const Part = function (sprite, offset, orientation) {
    this.sprite = sprite;
    this.orientation = (orientation) ? orientation : 0;
    this.owner = undefined;
    this.offset = (offset) ? new Point(offset.x, offset.y).toVector() : new Vector(0, 0);
}
//offset parameter is the "owners" screen coordinates.
Part.prototype.draw = function (ownerLocation) {
    let partLocation = {
        x: ownerLocation.x + cos(this.offset.angle+this.owner.angle) * this.offset.length / zoom,
        y: ownerLocation.y + sin(this.offset.angle+this.owner.angle) * this.offset.length / zoom
    };
    let orientation = this.orientation + this.owner.angle;
    this.sprite.draw(orientation, partLocation);
}