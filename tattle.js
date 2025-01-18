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
    this.prefix = (prefix) ? prefix : '';
    this.message = msg;
    this.color = (color) ? color : `#f0f`;
}
/*Constructor defines the font size in Em's, #lines (height depends on this),and width in pixels)*/
const Tattler = function (fontSize, lines, width, bgColor) {
    this.tales = [];
    this.fontSize = (fontSize) ? fontSize : 1;
    this.lines = lines;
    this.width = (width) ? width : 300;
    this.bgColor = (bgColor) ? bgColor : '#210';
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
    let yline = getTextHeight(this.fontSize + 'em monospace') + 2;
    let x0 = _canvas.width - this.width;
    let y0 = _screenSize.y - (yd * this.lines);
    let x1 = _screenSize.x;
    let y1 = _screenSize.y;
    drawBox(x0, y0, x1, y1, this.bgColor, true, 1)
    let x = x0 + 2;
    let y = y0 + yline / 2;
    for (let i = 0; i < this.tales.length; i++) {
        let text = `${this.tales[i].prefix} :${this.tales[i].message} :(${this.tales[i].count})`;
        drawTextLeft(x, y, text);
        y += yd;
    }
}