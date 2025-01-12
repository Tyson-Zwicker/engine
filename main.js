let canvas = undefined;
let ctx = undefined;
let oldTime = Date.now();
let camera = new Point(0, 0);
let zoom = 1;
const mouse = {
    wheel: {
        where: 0,
        when: null
    },
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
const buildPage = function (framerate) {
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = "0px";
    canvas = document.createElement('canvas');
    canvas.style.padding = "0px 0px 0px 0px";
    canvas.style.margin = "0px 0px 0px 0px";
    canvas.style.border = "0px";
    ctx = canvas.getContext('2d');
    body.appendChild(canvas);
    canvas.onwheel = function (e) {
        mouse.wheel = {
            where: e.deltaY,
            when: Date.now()
        }
    }
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
    //TODO: Add wheel support, change the "zoom" level.
    //Also where is "zoom" actually defined... or is it just hard coded as 1 everywhere?
    shapeCanvas();
    mainLoop()
    if (framerate) setInterval(mainLoop, framerate);
}
const centerOfScreen = { "x": window.innerWidth / 2, "y": window.innerHeight / 2 };
const screenSize = { "x": window.innerWidth, "y": window.innerHeight };
const shapeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerOfScreen.x = window.innerWidth / 2;
    centerOfScreen.y = window.innerHeight / 2;
    screenSize.x = window.innerWidth;
    screenSize.y = window.innerHeight;
}
window.addEventListener("resize", shapeCanvas);
const mainLoop = function () {
    let time = Date.now();
    //delta is how long since last update in milliseconds.
    let delta = (time - oldTime) / 1000; //A percentage of 1 second.
    oldTime = time;
    if (program) {
        ctx.fillStyle = '#112';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        do {
            drawTextLeft(10, 10, time.toString().substring(7), 1);
        } while (false);
        if (program.run) {
            program.run(delta);
        } else {
            console.log('Nothing to loop.. yet?');
        }
    } else {
        console.log('waiting for program to show up..');
    }
    mouse.wheel.where = 0;//reset the scroll 'wheel delta' to none (0)
}