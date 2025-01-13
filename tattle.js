/*A Talller textbox that is drawn in the canvas. It is an alternative to the
console.log() command. Used for debugging when you want to open up the console
all the time.*

A Tale is the debugging message, given to the tattler.
*/
/*
    Constructor. Prefix is used to group messages to avoid clutter.  msg is the debug
    message and you may optionally define a color (otherwise it's purple)
*/
const Tale = function (prefix, msg, color) {
    this.count = 1;
    this.prefix = ( prefix)? prefix : '';
    this.message = msg;
    this.color = (color) ? color : `#f0f`;
}
/*Constructor defines the font, #lines (height depends on this),and width in pixels)*/
const Tattler = function (font, lines, width) {
    this.tales = [];
    this.font = (font) ? font : '1em monospace';
    this.lines = lines;
    this.width = (width) ? width : 300;
};
/*This adds Tales to the Tattler, strongly grouping by prefix*/
Tattler.prototype.tellGroup = function (tale) {
    let found = false;
    this.tales.forEach((t) => {
        if (t.prefix === tale.prefix) {
            t.count++;
            found = true;
            t.message = tale.message;
        }
    });
    if (!found) {
        this.tales.unshift(tale);
    }
    if (this.tales.length === this.lines) {
        this.tales.pop();
    }
}
/* 
    This adds Tales to the Tattler, but only groups suscessive prefixes. (causes
    more text scroll)
*/
Tattler.prototype.tell = function (tale) {
    if (this.tales[0]) {
        if (this.tales[0].prefix == tale.prefix) {
            this.tales[0].count++;
            return;
        }
    }
    if (this.tales.length === this.lines) {
        this.tales.pop();
    }
    this.tales.unshift(tale);
};
/*  Draw a rectangle on the canvas and prints the Tales onto it. */
Tattler.prototype.tattle = function () {
    _ctx.font = this.font;
    var fM = _ctx.measureText("A");
    let yd = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent + 3;
    let y = window.innerHeight - (yd * this.lines);
    let w = this.width;
    let x = _canvas.width - w;
    let h = yd * this.lines;
    _ctx.beginPath();
    _ctx.fillStyle = '#000';
    _ctx.fillRect(x, _canvas.height - h - yd, w, h);
    _ctx.stroke();
    _ctx.closePath();
    for (let i = 0; i < this.tales.length; i++) {
        _ctx.beginPath();
        _ctx.fillStyle = this.tales[i].color;
        _ctx.fillText(`${this.tales[i].prefix} :${this.tales[i].message} :(${this.tales[i].count})`, x + 5, y);
        y += yd;
        _ctx.closePath();
    }
    _ctx.stroke();
    _ctx.closePath();
}