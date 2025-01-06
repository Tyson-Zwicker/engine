# Not the Manual

**There is a manual, I am still writing that.  This document is more a walk through or quick tutorial. I attempt to be detailed, and the information is as true as I can make it (the code is faithfully copied from a working/compiler-happy page)- but it not as concise as I would choose it to be.**

*This assumes you have a web server and a web browser- It is a JavaScript project, afterall. If not, download VSCode, YouTube how to run an extension called LiveServer, and use it. Or do it your own way, Or wait for that manual I allude to.*

pull git@github.com:Tyson-Zwicker/engine.git for the files.

Next, create an html file, and copy this code into it:


     <html>
        <head>
            <script src="./maths.js"></script>
            <script src="./main.js"></script>
            <script src="./tattle.js"></script>
            <script src="./sprite.js"></script>
            <script src="./button.js"></script>
            <script src="./touchables.js"></script>
            <script src="./part.js"></script>
            <script src="./entity.js"></script>
        </head>
        <body onload="buildPage(33)" style="border:none">
            <script>
                //Define stuff you want your main loop to have access to here.
                const program = {
                    run: function (delta) {
                        //This is the "main loop" of your program.
                    }
                };
            </script>
        </body>
    </html>

If you visit your web server with the browser and request the file, the page you see should be dark grey with a white number in the upper left hand corner.  This is a timestamp. If the number is changing, that means its working!

Notice the line:

        <body onload="buildPage(33)" style="border:none">

**buildPage** is function of *main.js* (one of the files you imported).  This function is the one that created the canvas, creates events to keep it expanded to the window and runs a timer keep it all updated. The "33" is the number of milliseconds it will wait before re-running the main loop / refreshing the screen. You can slow it down by making the number larger, or speed it up by making it smaller.  Note this can be affected by any computation that has to occur between screen refreshes.  The browser will try to call your program's main loop at the requested interval, but if your computations take longer than the specified interval, it will still call the function again.  Effectively your code is stepping on its own feet, so keep this in mind; It can lead to stack overflows.

The program will keep the canvas maximized, show the time stamp, and remember the state of the mouse the last time the main loop was executed.  Anything beyound that must be written by you.

# In Summary

By envoking buildPage, you know have access to the follow Global Level Properties:

  * canvas :    It will refer to the one you've already seen with the timestamp.
  * ctx    :    It will refer to "context" of afore  mention canvas.  You can draw on it.  Further on more libraries will explain how to make some of that job easier.
  * program:    That is your empty program.  It is doesn't exist, nothing happens.  It needs to have a run function because whatever you put into that function will be what runs in your program.
  * mouse:      This knows what the mouse did left cycle.  It knows where and went the mouse moved, got pressed, and got released, also what the button is upto right this second.

# The Mouse
The Mouse bears some talking about because you're going to need it a lot.  So here is how it works:  Once (And Only Once) per javascript's turn to get a slice of a the processor and pretend to run the show it gets to do event collection.  When that happens the "mouse" object, which is global just like "canvas" and "ctx" and "program", gets updates (if anything happened).  It records the place and time of the three events it understands, and the last know status of the left mouse button.

**The Mouse**

Information about what the mouse was been up to is available by the appropriately named "mouse". It is a global constant.

  * **mouse.move.when**:  timestamp of the last time the mouse moved.
  *  **mouse.move.where**: is a point (x,y) where the last known mouse coordinates.
  *  **mouse.down.when**:  timestamp of the last time the mouse's left button was pressed.
  *  **mouse.down.where**: is a point (x,y) where the mouse was last located when the mouse button was pressed.
  *  **mouse.up.when**:    timestamp ofthe last time the left mouse button was released.
  *  **mouse.up.where**:   is a point (x,y) where them ouse was last located when the mouse button was released.
  *  **mouse.mouseDown**:   true ifleft mouse button pressed down, false if not.

There is nothing more to the mouse.  The information is always there.  Other things, like "Button", use it a lot.

# Adding a Tattle

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
So what does all this nonsense do!?  It tells the tattler three "tales" about the mouse and the tales get told at the end.

**Tale**

  * prefix - used for grouping similar messages to gether.
  * message - the message you want to show on the Tattler
  * color - the color you want that message to be shown in.

Tales are stories you want to be shown.  They come with an prefix, which can help them to group together things that similar, or you can ignore the prefix and it will just scroll your messages. Next follows a message you want shown and finally, optional color (defaults to white).

**Tattler**

This is the that collects all the Tales and, when asked, draw them all. It handles culling messages that have scrolled out of the viewable area, clipping text that's to wide, and actually drawing the rectangular background and the words.
You don't have to do anything special with it, just tell it to Tattle(), and it will.

**Important note**: Its is best to collect tales through out a program cycle and tattle *only once* at the *end* of the loop once everything else has
finished drawing.

*So that's the Tattler, sometimes useful,entirely optional.*


## Time for Sprites ##

Sprites are important.  Without them you mostly just looking a lot nothing.  They are very simple, they're just a bunch of colored lines-  You and turn them, scale them, and move them around the screen.  But that's it.

    <script>
        // this is where you use the tools to make your program
        const sprite1 = new Sprite([
            new SpriteLine(-100, -100, 100, -100, '#ff0', 2),
            new SpriteLine(100, -100, 0, 100, '#ff0', 2),
            new SpriteLine(0, 100, -100, -100, '#ff0', 2)
        ]);
        const program = {
            run: function (delta) {
                sprite1.draw (1, rad (45),{x:400,y:400});
            }
        };
    </script>

The first thing this does is define a yellow (#ff0) triangle, each line has a thickness of two.

A **sprite**'s parameters are:

  * x0,y0,x1,y1 : Cartension coordinates that define start and end point for line.  The center of the sprite is 0,0. Note this has nothing to to the center of the window or the canvas. These coordinates are relative to the sprite's own center.
  * color: The color that the line should have.  In our example '#ff0' makes yellow.
  * thichness:  how thick the colored line should be drawn. Two pixels in this example.

a **sprite** has one function: **draw**. It's parameters are:

  * scale: 1 is "normal". Larger numbers will make the sprite appear bigger.  Above zero, but below one, will make theimages appear smaler and closer togher.
  * 
  * rotation: the amount to rotate the sprite. This is in Radians.
  * offset: where on the screen the sprite should consider its center (0,0) so it can draw itself in the right place
  
*That's about it for sprites they're super easy.  They're just colored lines drawing pictures.*

## Entities ##

An "*entity*",  is a just something that can keep track of where it is, which way it is facing, which way its moving, and how heavy it is.  It could be a sitting rock, or a thrown rock.  It could represent a whole planet (which is just another rock I guess).  Or a robot. Its not a geogolgy simulator.

Enties can be assigned a sprite, so they can show what they're doing, and they have a small handful of methods that, if called during the main loop, keep them moving in whatever direction they think they should. Another small group of methods lets them be pushed and pulled and spun, allowing you to exert an exertnal force to them, wether that be to simulate gravity/wind/sea currents/electricl fields, who knows what you're writing?. An entity is very generic. It is ment to be customized.

It can contain more sprites, all of which take their direction from the location and and orientation of the Entity.  There is another thing that Entities can have: parts.  Parts are, as the name suggests, pieces of the entity.  They have their own locaion on the entity (again relative to the center of the entity [0,0]), but they can also spin independently of the entity they belong to, like eyes can turn in a head or a hand independent of an arm. Or a turret of three 18" Naval guns spinning around to look at something it doed not like.

Parts can spin.  More on those later.

This next part makes two instances and sends them off through space. Ignore the reference to "*camera*" I promise I'll talk about that next.

**To Instation one:**

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

A Entity's will move along they're pre-determined path a rate called the "delta".  The idea is that  regardless of how long the program has bothered to look at it, or ask it to move, it will have moved exactly as far as it would have if it had not been ignored.  *It behave independ of framerate.*

To make the entity to move, a small number of function suffice:

  * move(delta) : this will move the entity by however far it would have in "delta" milliseconds.
  * spin(delta) : this wlll rotate the entity by however far it would have. 

To "nudge" them into a different course or spin, the following functions can be applied:

  * push (vector) : will change the entities vector. The length is the force, the angle is, obviously
  * spin **I have put of implementing this:** I could just say *"the entity is a perfect sphere"* I feel like I (or someone) should be able to drum up enough first year uni physics approximate something better based on the shape of the sprites.

## Cameras and Coordinates

Let's talk about the *camera*, since it was ignored in that last section. *It is a point in space that the center of of the screen is attached to*- that it. Its a Point: *(x ,y)*.  Things in the program are going to be *all over the place* so you need to move around on the screen:  that's what the camera does.  

**Zoom/Scale is currently its own thing: But it will become part of camera in a very much planned update.**

##  Parts
I just added these, they need expanding up.  For the moment, you can slap as many as you want on an entity, they contain a single sprite and they know which why they are looking *relative to their "owner"*.

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

# Button Manager

The ButtonManager is so named because it manages all the buttons.  It checks what the mouse has been doing, decides how the buttons should feel about that, and draws all the buttons accordingly.  You give it buttons to manage either when it is constructed (as an array of buttons) or you can use the "addButton()" method:



    const ButtonManager = new buttonManager 9[button1, button2, button3];
buttonManager.addButton (theButtonIForgot);

This has been Not the Manual.
