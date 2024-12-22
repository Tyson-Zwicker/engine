/*
    A Sprite is a picture. These sprites are unfilled polygons created by
    joining SpriteLines.

    SpriteLines do two things.  First, they will convert a pair of 
    coortesian coordinates into vectors (which makes drawing them
    much faster because Sprites can rotate).  Secondly, it draws them.
*/

/*  Constuctor defines two pair of coordinates relative to the center of the Sprite. */
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
/*  SpriteLine function that draws the line, using given color and thickness. */
SpriteLine.prototype.draw = function (scale, rotation, offset) {
    /*Create a new line, set width and color*/
  //  ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.strokeWidth = this.thickness;
   
    /*
        Rotate the vectors, convert them to cartesian coordinates
        and translate by offset.
    */
    let x0 = cos(this.v1.angle + rotation) * this.v1.length * scale + offset.x;
    let y0 = sin(this.v1.angle + rotation) * this.v1.length * scale + offset.y;
    let x1 = cos(this.v2.angle + rotation) * this.v2.length * scale + offset.x;
    let y1 = sin(this.v2.angle + rotation) * this.v2.length * scale + offset.y;
    /*draw the line*/
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    //ctx.closePath();
    ctx.stroke();
}
/*  Constructor, parameter should be an array of SpriteLines (optional) */
const Sprite = function (lines) {
    this.lines = (lines) ? lines : [];
}
/*  Draws all of the SpriteLines it contains */
Sprite.prototype.draw = function (offset, scale, rotation) {
    ctx.beginPath();
    this.lines.forEach((line) => { line.draw(offset, scale, rotation) });
}