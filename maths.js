
/*This library holds all of the functions that do commonly needed
mathematic functions, or define the datatype.It wraps a lot of the
built in Math class.
*/
const Vector = function (a, l) {
    this.angle = a;
    this.length = l;
}
Vector.prototype.toPoint = function (){
    return new Point (
        Math.cos (this.angle)*this.length,
        Math.sin (this.angle)*this.length
    );
}
const Point = function (x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toVector = function () {
    return new Vector(
        bearing({ x: 0, y: 0 }, this),
        length(this.x, this.y)
    )
}
const rad = function (d) {
    return d * Math.PI / 180;
}
const deg = function (r) {
    return r * 180 / Math.PI;
}
const length = function (x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
const bearing = function (p0, p1) {
    let b = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    if (b < 0) b += Math.PI * 2;
    return b;
}
const atan = function (y, x) {
    let a = (x) ? y / x : y;
    return (Math.atan(y / x));
}
const sin = function (angle) {
    return Math.sin(angle);
}
const cos = function (angle) {
    return Math.cos(angle);
}
const bounded = function (thing, rect) {
    return (
        thing.x > rect.x0 && thing.x < rect.x1 && thing.y > rect.y0 && thing.y < rect.y1
    );
}