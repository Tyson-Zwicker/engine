const Part = function (name,sprite, offset, orientation) {
    this.sprite = sprite;
    this.orientation = (orientation) ? orientation : 0;
    this.owner = undefined;
    this.offset = (offset) ? new Point(offset.x, offset.y).toVector() : new Vector(0, 0);
}
//offset parameter is the "owners" screen coordinates.
Part.prototype.draw = function (ownerLocation) {
    let x = ownerLocation.x;
    let partLocation = {
        x: ownerLocation.x + cos(this.offset.angle+this.owner.angle) * this.offset.length * _zoom,
        y: ownerLocation.y + sin(this.offset.angle+this.owner.angle) * this.offset.length * _zoom
    };
    let orientation = this.orientation + this.owner.angle;
    this.sprite.draw(orientation, partLocation);
}
Part.prototype.clone = function (){
    return new Part (this.name, this.sprite, this.offset.toPoint(), this.orientation);
}