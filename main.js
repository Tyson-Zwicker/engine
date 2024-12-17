/*
    Interface with the browser to give you an updating canvas, keeps track of the 
    mouse and also calls the run() function defined in index.html, on a timer.
*/
let debug = true;
let canvas = undefined;
let ctx = undefined;
let oldTime = Date.now();
/*
    This is updated when the browser get a chance.  JS get to finish its whole thread 
    without interuption before getting updated.  Used in main loop to get reliable/stable
    mouse state.
*/
const mouse = {
    move: {
        where: new Point(0, 0),
        when: null
    },
    down: {
        where: new Point(0, 0),
        when: null
    },
    up: {
        where: new Point(0, 0),
        when: null
    },
    buttonDown: false
}
/*  Creates the canvas, adds it to the page, wires the events and calls mainloop! */
const buildPage = function (framerate) {
    // Add canvas..
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = "0px";
    canvas = document.createElement('canvas');
    canvas.style.padding = "0px 0px 0px 0px";
    canvas.style.margin = "0px 0px 0px 0px";
    canvas.style.border = "0px";
    ctx = canvas.getContext('2d');
    body.appendChild(canvas);
    // Wire events.
    canvas.onmousemove = function (e) {
        mouse.move = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now()
        }
    }
    canvas.onmousedown = function (e) {
        mouse.down = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now(),

        };
        mouse.buttonDown = true;
    }
    canvas.onmouseup = function (e) {
        mouse.up = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now(),

        };
        mouse.buttonDown = false;
    }
    // Fix canvas size and run first main loop.
    shapeCanvas();
    mainLoop();
    // if a framerate was specified, tell the browser to keep running it.
    if (framerate) setInterval(mainLoop, framerate);
}
/*  Full-Window the canvas */
const shapeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
/*
    This runs repeatedly until the web page is closed.
    The run function is defined by the consumer and added to "game" 
    object in the index.html file.
*/
const mainLoop = function (thingToLoop) {
    let time = Date.now();
    //delta is how long since last update in milliseconds.
    let delta = time - oldTime;
    oldTime = time;
    if (game) {
        if (game.debug) {
            ctx.fillStyle = '#112';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFF';
            let timestring = time.toString();
            let substring = timestring.substring(6);
            ctx.font = "1em monospace";
            ctx.fillText(substring + '', 30, 30);
        }
        ctx.stroke();
        if (game.run) {
            game.run(delta);
        } else {
            console.log('Nothing to loop.. yet?');
        }
    } else {
        console.log('waiting for game object to show up...');
    }
}
window.addEventListener("resize", shapeCanvas);

