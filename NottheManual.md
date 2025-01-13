# Not the Manual

## Introduction

There is a manual, I am still writing that.  This document is more a walk through or quick tutorial. I attempt to be detailed, and the information is as true as I can make it (the code is faithfully copied from a working/compiler-happy page)- but it not as concise as I would choose it to be.

*This assumes you have a web server and a web browser- It is a JavaScript project, afterall. If not, download VSCode, YouTube how to run an extension called LiveServer, and use it. Or do it your own way, Or wait for that manual I allude to.*

git@github.com:Tyson-Zwicker/engine.git for the files.

The project currently consists of a directory called `testpages` and a series of javascript files in the project root.   Most of the javascript files have a corresponding test page.  There is also an html file in the `testpages` directory called `blank.html`.  When you create your program, make a copy of `blank.html` and use it as a template.

For the purposes of this document, I will refer all of the JavaScript files as "libraries" (with the exception of `main.js` its special) because they are really just a long list of functions or constants.  That you can use to speed up development time.

##The web side of things

If you visit your web server with the browser and request the `blank.html` file, the page you see should be dark grey with a white number in the upper left hand corner.  This is a timestamp. If the number is changing, that means its working!

You will see that the HTML file loads three JavaScript files:  `maths.js`, `gfx.js`,`main.js'.  These three files form the core of the system.  There are many others that can be added later, but these three must come first and they must be imported in this order.

`Maths.js` does just it says: Math.  It's a library of functions that you may need (and that other libraries *do* need).  It will be discussed in detail later.

`gfx.js` provides functions calls that can draw to the canvas. They are the same functions available to the native canvas, but instead of taking 7 lines of code to draw a circle, line, text, whatever, you use a function in `gfx.js` to do the same thing with one line of code.  This is used extensively by  any of the other libraries.

`main.js` is special.  It is what runs the program's Main Loop.  It does all the event handling.  It could be considered the engine the runs everything.  We'll start by discussing how to use it.

###Main.js 

In you HTML file, just after the three core scripts are loaded, the HTML Body tag calls a function in `main.js` called `buildPage`

        <body onload="buildPage(33)" style="border:none">

This function is the one that created the canvas, this creates the canvas, wires the events, tracks the mouse and keyboard and initiates the Main Loop.  It will also resize the canvas for you if the browser window is resized.

Once `buildPage` has been called, you will have access to the follow Global Level Properties:

  * canvas: It will refer to the one you've already seen with the timestamp.  You cannot draw directly to the canvas, you must use it's 'context'.
  * ctx: This is the "2D context" of the afore  mention canvas.  You *can* draw on it.  There are other libraries that will make that a lot easier for you.
  * mouse: This knows what the mouse did left cycle.  It knows where and went the mouse moved, got pressed, and got released, also what the button is upto right this second.
  * zoom: scales the graphics.  A value of 1 shows everything full size, values less than 1 will "zoom out" all the graphics.
  * camera: a Point (x,y) changes the "world coordinates" that is considered to be the center of the screen, causing all the graphics to be offset by the x,y values.
  * key : I have not written this in yet. **> TODO <**
  
###Mouse

Information about what the mouse was been up to is available by the appropriately named "mouse". It is a global constant.

  * **mouse.move.when**:  timestamp of the last time the mouse moved.
  * **mouse.move.where**: is a point (x,y) where the last known mouse coordinates.
  * **mouse.down.when**:  timestamp of the last time the mouse's left button was pressed.
  * **mouse.down.where**: is a point (x,y) where the mouse was last located when the mouse button was pressed.
  * **mouse.up.when**:    timestamp ofthe last time the left mouse button was released.
  * **mouse.up.where**:   is a point (x,y) where them ouse was last located when the mouse button was released.
  * **mouse.buttonDown**:   true if left mouse button pressed down, false if not.
  * **mouse.wheel.where**: returns the delta of the mouse scroll wheel in pixels.
  * **mosue.wheel.when**: timestamp of the last mouse scroll wheel turn.

There is nothing more to the mouse.  The information is always there.  Other things, like "Button", use it a lot. The concept of a "Point" will be touched on in much detail in section on `math.js`.

###Key

    **TODO : write this!**

###Program

If you go into the body of the HTML document, you will find a `script` tag with some code:

     <script>
        //Initialization here..
        const program = {
            run: function (delta) {
               //Main loop here.
            }
        };
    </script>

When the page loads, `main.js` goes into a holding pattern- waiting for the `program` constant to be created.  Once it sees this, it will call the `run` function at the regular interval specified when `buildPage` was called.

Examples of how to fill in this script with an actual program can be found in each of the HTML files in the `testpages` directory.

##The Libraries

###Maths.js

The main purpose of this library is to shorten the amount of code needed to handle geometry and trigonometry.

It exposes two constants that are globally accessible:

* **PI**:  Just shorthand for Math.PI
* **TAU**: PI*2 (the full circle).

It provides two data structures:

**Point**

You can create a point with:

`let myPoint = new Point (x,y);`

It has three methods:

* add: returns a new point which is the sum of this point, and the point provided as a parameter:

 `let myPoint2 = myPoint.add (new Point (2,3));`

* mult: returns a new point which is the scalar product of this point, and a numerical value passed as the paramter: 

`let myPoint3 = myPoint.mult (2)`

* toVector: converts the point to a vector defined as the vector pointing from origin (0,0) to the X and Y components of this point:

`let myVector = myPoint.toVector();`

**Vector**

You can create a vectow with

     let myVector = new Vector (angle,length);
b
Vector has a single method:

* toPoint(): This will convert the vector to a Point.

**Functions**

Maths.js also provides the following globally accessible functions:

*rnd (min,max): returns a value between min and max.

*rad (degrees): converts degrees to radians.

*deg (radians): converts radians to degrees.

*length (x,y): calculates the length of a line segment originating at (0,0) and extending to (x,y)

*distance (p0,p1): calculates the distance between two points.

*bearing (p0,p1): caclculates the angle between p0 and p1. Its is basically the Atan function but provides values between 0 and Tau instead of the traditional and somewhat less useful angle from the horizontal.

*atan (y,x): Short hand for Math.atan (y/x).

*sin (angle): Short hand for Math.sin(angle)

*cos (angle): Short hand for Math.cos (angle)

*bounded (point, rect): Returns true if point lies with the boundries of rect. Rect must be  an object of the form {x0,y0,x1,y1}

###Gfx.js 

All of the functions in Gfx draw directly to the canvas. There are no data structures, or constants.

All colors are assumed to be of the form *#RGB* **not** *#RRGGBB*.  In most cases it won't matter, but the more precise #RRGGBB" will cause odd results in some other libraries.

* drawArc (x,y,r,a0,a1,color, thickness): draw an arc with an origin at (x,y), radius of r, between angles a0, and a1 (in radians). Color and thickness are optinal, defaulting to "white" and 1 respectively.

* drawCircle (x,y,r, color, fill, thickness): draw circle at (x,y) with radius r.  color, fill and thickness are optional.  default is white, not-filled, and 1 respectively.

* drawPie (x,y,r,a0,a1,color,fill, thickness): draw a pie shaped section of a circle at (x,y) with radius r, from an arc from a0 to a1.color, fill and thickness are optional and default to white, not-filled, and 1, respectively.

*drawPixel (x,y,color): draw a single pixel at (x,y) color defaults to white.

*drawLine (x0,y0,x1,y1,thickness, color): draws a line between (x0,y0) and (x1,y1). Thickness defaults to 1, color defaults to white.

*drawTextCenter (x,y,text, size, color): draw filled text centered at (x,y). Text is text to draw, size defaults 1 (unit is em's) and color defaults to white.  Text is centered vertically on y.

*drawTextLeft (x,y,text, size, color): draw filled text whose left side will be at touch x. Text is text to draw, size defaults 1 (unit is em's) and color defaults to white.Text is centered vertically on y.

*drawTextRight (x,y,text, size, color): draw filled text whose right side will touch x. at (x,y). Text is text to draw, size defaults 1 (unit is em's) and color defaults to white. Text is centered vertically on y.
 
rgbToHex (r,g,b): given a red, green  and blue decimal values between 0 and 15, it will return a string formatted as a CSS-style color: "#RGB" where RG and B are in hexidecimal.

###The Tattler

While not necessary, or in most cases, even desired, having a chunk of the canvas devoted to telling you what the program is doing can be useful when debugging.  Its also useful for letting users see how the internal workings are... working, things like FPS or number of object being rendered or, whatever people want to see on-the-fly.

The following code will add a Tattle to the lower right hand corner of the screen, and it will show the mouse position and the state of the the left mouse button, to give you an idea of how mouse works.

     <body onload="buildPage(33)" style="border:none">
        <script>
            //Define stuff you want your main loop to have access to here.
            tattler = new Tattler ('1em monospace', 10, 300);
            const program = {
                run: function (delta) { 
                    let tale = new Tale (`mouse @`,`(${mouse.move.where.x},${mouse.move.where.y})`,`#ff0`);
                    tattler.tellGroup (tale);
                    tale = new Tale ('button down',mouse.buttonDown,'#fff');
                    tattler.tellGroup (tale);
                    tale = new Tale ('down @',(`${mouse.down.where.x},${mouse.down.where.y})`,'#ff0'); 
                    tattler.tellGroup (tale);
                    tale = new Tale ('up @',`$({mouse.up.where.x},${mouse.up.where.y})`,'#0f0'); 
                    tattler.tellGroup (tale);
                    tattler.tattle();
                }
            };
        </script>

**Tale**

Constructor Parameters:
  * prefix - used for grouping similar messages together.
  * message - the message you want to show on the Tattler
  * color - the color you want that message to be shown in.

Tales are messages you want to be shown.  They come with prefix, which can help them to group together things that similar, or you can ignore the prefix and it will just scroll your messages. Next follows a message you want shown and finally, optional color (defaults to white).


**Tattler**

This is the that collects all the Tales and, when asked, draw them all. It handles culling messages that have scrolled out of the viewable area, clipping text that's to wide, and actually drawing the rectangular background and the words.  You don't have to do anything special with it, just tell it to Tattle(), and it will. The tattler is always drawn in the lower right hand of the window.

Constructor Parameters:
 * font
 * line spacing
 * height

**Important note**: Its is best to collect tales through out a program cycle and tattle *only once* at the *end* of the loop once everything else has
finished drawing.

If you want you want the messages grouped use:

`tellGroup (tale);`

If you don't care about grouping them:

`tell (tale);`

And to make it tell:

`tattle()`

## Sprite ##

Sprite are very simple vector graphics: they're just a bunch of colored lines, that can be different colors.  You and rotate them, scale them, and move them around the screen.

    <script>
        // this is where you use the tools to make your program
        const sprite1 = new Sprite([
            new SpriteLine(-100, -100, 100, -100, '#ff0', 2),
            new SpriteLine(100, -100, 0, 100, '#ff0', 2),
            new SpriteLine(0, 100, -100, -100, '#ff0', 2)
        ]);
        const program = {
            run: function (delta) {
                sprite1.draw (rad (45),{x:400,y:400});
            }
        };
    </script>

The first thing this does is define a yellow (#ff0) triangle, each line has a thickness of two.  The main loop draws it.

**Constructor parameters:**

  * x0,y0,x1,y1 : Cartension coordinates that define start and end point for line.  The center of the sprite is 0,0. Note this has nothing to to the center of the window or the canvas. These coordinates are relative to the sprite's own center.
  * color: The color that the line should have.  In our example '#ff0' makes yellow.
  * thickness:  how thick the colored line should be drawn. Two pixels in this example.

a **sprite** has one function: **draw**. It's parameters are:

  * rotation: the amount to rotate the sprite. This is in Radians.
  * offset: where on the screen the sprite should consider its center (0,0) so it can draw itself in the right place

To scale the sprites, set the global variable *zoom* to a value greater than 0 and less than 1.  A value of 1 will scale them to their specified size, a number under 1 will "zoom out" the sprites.

There is also a global variable *camera* which is Point.  Setting it change the "world coordinates", and will offset all the sprites accordingly.
  
## Entities ##

An "*entity*",  is an object that can keep track of where it is, which way it is facing, which way its moving, and how heavy it is.  It could be a sitting rock, or a thrown rock.  It could represent a whole planet (which is just another rock I guess).  Or a robot or a spaceship.

Enties can be assigned a sprite, so they can show what they're doing, and they have a small handful of methods that, if called during the main loop, keep them moving in whatever direction they they should. Another small group of methods lets them be pushed and pulled and spun, allowing you to exert an exertnal force to them, wether that be to simulate gravity/wind/sea currents/electricl fields, who knows what you're writing?. An entity is very generic. It is meant to be customized. It can contain more sprites, all of which take their direction from the location and and orientation of the Entity. 

There is another thing that Entities can have: parts.  Parts are, as the name suggests, pieces of the entity.  They have their own locaion on the entity (again relative to the center of the entity [0,0]), but they can also spin independently of the entity they belong to, like eyes can turn in a head, a hand independent of an arm, or a gun turrent moving independent of the ship its mounted on.

This next part makes two instances and sends them off through space. Ignore the reference to "*camera*" I'll talk about that next.

**TODO: EDIT FROM HERE.  CHANGE CODE EXAMPLE TO CONSTRUCTOR DEFINITION..**

      <script>
        //We will give our new Entity Two Sprites.  On Yellow Triangle, Longed from its center in the ..
        const sprite1 = new Sprite([
            new SpriteLine(0, -150, 100, -100, '#ff0', 2),
            new SpriteLine(100, -100, -100, 100, '#ff0', 2),
            new SpriteLine(-100, 100, -150, -100, '#ff0', 2)
        ]);
        //The inner triangle will be smaller, but with different colors per line, for fun.
        const sprite2 = new Sprite([
            new SpriteLine(0, -90, 70, -70, '#f0f', 2),
            new SpriteLine(70, -70, -70, -70, '#f0f', 2),
            new SpriteLine(-70, -70, 0, -70, '#f0f', 2)
        ]);
        const entity1 = new Entity(
            'Test1', [sprite1, sprite2], { x: 0, y: 0 },
            rad(45), { x: 1, y: 1 }, rad(1), 10);
        const entity2 = new Entity(
            'Test2',[sprite1, sprite2],{ x: -50, y: 400 },
            rad(270), { x: 3, y: -2 }, rad(0.5), 10);
        let camera = {x:0,y:0}; //<--This need discussing.
        const program = {
            run: function (delta) {
                let scale = 1;
                entity1.draw (camera, scale);
                entity1.move (delta);
                entity2.draw (camera, scale);
                entity2.move (delta);
            }
        };
    </script>


EXPLAIN DELTA BETTER - IT IS A %,  NOT A TIMESPAN in MS..

A Entity's will move along they're pre-determined path a rate called the "delta".  The idea is that  regardless of how long the program has bothered to look at it, or ask it to move, it will have moved exactly as far as it would have if it had not been ignored.  *It behaves independ of framerate.*

To make the entity  move, a small number of function suffice:

  * move(delta) : this will move the entity by however far it would have in "delta" milliseconds.
  * spin(delta) : this wlll rotate the entity by however far it would have. 

To "nudge" them into a different course or spin, the following functions can be applied:

  * push (vector) : will change the entities vector. The length is the force, the angle is, obviously
  * spin **I have put of implementing this:** I could just say *"the entity is a perfect sphere"* I feel like I (or someone) should be able to drum up enough first year uni physics approximate something better based on the shape of the sprites.

## Cameras and Coordinates

Let's talk about the *camera*, since it was ignored in that last section. *It is a point in space that the center of of the screen is attached to*- that it. Its a Point: *(x ,y)*.  Things in the program are going to be *all over the place* so you need to move around on the screen:  that's what the camera does.  

**Zoom/Scale is currently its own thing: But it will become part of camera in a very much planned update- and camera will become a global or a "main" property as well.**

##  Parts
I just added these, they need expanding upon.  For the moment, you can slap as many as you want on an entity, they contain a single sprite and they know which why they are looking *relative to their "owner"*.


##  Buttons
Buttons are colored rectangles, typically adorned with a word or two, that can be "clicked" by the mouse.  You define them using a constructor. The parameters are:

* **name** - (its an ID, you don't need to worry about it at the moment- nothing bad will happen if you leave it blank, but it should be a string.)
* **label** - This is the text it will draw on the button.
*  x0,y0,x1,y1 - four numbers (two sets of coordinates) that define the upper left and lower right boundaries of the button.
*  **fontsize** - At the momemt monospace is the only font you get.  The font# the size you get, in "em"'s.  Typically 16pt is 1 em but it varies by device and application.
*  **color, bgcolor** - The normal sets of colors to draw the button.  The text gets the same color as the border.
*  **highlightColor, highlighBGColor** - The sets of colors to draw the button when its hovered over wit the mouse.  Clicking on the button will invert these two colors.
* **action** - a function that will run if this button is clicked.

Example Button:

    const button1 = new Button(
    'button1',
    'Button One!',
    30, 40, 180, 70,
    1.1,
    '#700', '#aa0',
    '#00f', '#0ff',
    action1);

Now, this button will do exactly *nothing* without something to tell it what to do. Which brings us to the...

## Button Manager

The ButtonManager is so named because it manages all the buttons.  It checks what the mouse has been doing, decides how the buttons should feel about that, and draws all the buttons accordingly.  You give it buttons to manage either when it is constructed (as an array of buttons) or you can use the "addButton()" method:



    const ButtonManager = new buttonManager 9[button1, button2, button3];
buttonManager.addButton (theButtonIForgot);

This has been Not the Manual.

