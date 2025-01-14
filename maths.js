/*This library holds all of the functions that do commonly needed
mathematic functions, or define the datatype.It wraps a lot of the
built in Math class.
*/
const PI = Math.PI;
const TAU = Math.PI * 2;
const Vector = function (a, l) {
    this.angle = a;
    this.length = l;
    this.toString = function (){
        return `(${this.length.toFixed(2)} @ ${deg (this.angle).toFixed(2)})`;
    }
}
Vector.prototype.toPoint = function () {
    return new Point(
        Math.cos(this.angle) * this.length,
        Math.sin(this.angle) * this.length
    );
}
const Point = function (x, y) {
    this.x = x;
    this.y = y;
    this.toString = function (){
        return `(${this.x.toFixed(2)},${this.y.toFixed(2)})`;;
    }
}

Point.prototype.toVector = function () {
    return new Vector(
        bearing({ x: 0, y: 0 }, this),
        length(this.x, this.y)
    )
}
Point.prototype.add = function (p) {
    return new Point(this.x + p.x, this.y + p.y);
}
Point.prototype.mult = function (s) {
    return new Point(this.x * s, this.y * s);
}
const rnd = function (min, max) {
    return Math.random() * (max - min);
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
const distance = function (p0, p1) {
    return length(p1.x - p0.x, p1.y - p0.y);
}
const bearing = function (p0, p1) {
    let b = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    if (b < 0) b += Math.PI * 2;
    return b;
}
const atan = function (y, x) {
    return (Math.atan(y / x));
}
const sin = function (angle) {
    return Math.sin(angle);
}
const cos = function (angle) {
    return Math.cos(angle);
}
const sqrt = function (i){
    return Math.sqrt(i);
}
const sqr = function (i){
    return Math.power (i,2);
}
const bounded = function (point, rect) {
    return (
        point.x > rect.x0 && point.x < rect.x1 && point.y > rect.y0 && point.y < rect.y1
    );
}