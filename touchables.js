/*
    Still in testing
*/

/*
    This defines a Touchable- anarea of the screen that can be interacted with the 
    mouse, and how to react to it hovering, touching (mouse down) and clicking (mouse up)
    
    The mouse is defined and wired to browser events in window.js
*/

/*  
    Constructor for the "thing that can be touched by the mouse". 
    It Takes a name, a rectangle, and the action (function) to call if its clicked.
*/
const Touchable = function (name, x0, y0, x1, y1, action) {
    this.name = name;
    this.x0 = x0;  //Defines a rectangle for Maths.bounds to check.
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.action = action;
    this.manger = null;
}
/*
    This is a collection of "Touchable" objects. It tracks which one is
    hovered, pressed down, or "clicked" or vacated by the mouse.
*/
/*  Constructor takes a collection of "Touchable" objects */
const Touchables = function (touchableObject) {
    this.touchables = [];
    this.pressed = null;
    this.hovered = null;
    //Add touchables for paramater array
    if (touchableObject) {
        touchableObject.forEach(touchable => {
            touchable.manager = this;
            this.touchables.push(touchable);
        });
    }
}
/*  Adds a "Touchable" object to the collection */
Touchables.prototype.add = function (touchable) {
    touchable.manager = this;
    this.touchables.push(touchable);
}
/*
    Checks to see what the mouse did and if it hovered, pressed, clicked or vacated
    a "Touchable" object in the collection
  
    It will fire the "Touchable" objects action if it is clicked.
*/
Touchables.prototype.check = function () {
    let found = false;
    // test
    game.tattler.tellGroup(new Tale(`mouse`, `down:${mouse.buttonDown} @ ${mouse.move.where.x}, ${mouse.move.where.y}`, '999'));
    this.touchables.forEach((t) => {
        // test
        game.tattler.tellGroup(new Tale(`touchables`, ` checking ${t.name} [${t.x0},${t.y0},${t.x1},${t.y1}]`, '#567'));
        if (bounded(mouse.move.where, t)) {
            found = true;
            if (t !== this.hovered) {
                // test
                game.tattler.tellGroup(new Tale(`touchables0`, ` hovered ${t.name}`, '#ff0'))
                this.hovered = t;
                this.pressed = null;
                return;
            }

            if (mouse.buttonDown === true && this.hovered === t) {
                // test
                game.tattler.tellGroup(new Tale(`touchables1`, ` pressed${t.name}`, '#f50'))
                this.pressed = t;
                return;
            }
            if (mouse.buttonDown === false && this.pressed === t) {
                // test
                game.tattler.tellGroup(new Tale(`touchables3`, ` !clicked${t.name}`, '#f22'))
                t.action;
                this.pressed = false;
            }
        }
    });
    if (!found) {
        // test
        game.tattler.tellGroup(new Tale(`untouch`, `${this.hovered} `, '#ff0'))
        this.hovered = false;
        this.pressed = false;
    }
}
