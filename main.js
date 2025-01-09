let canvas = undefined;
let ctx = undefined;
let oldTime = Date.now();
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
const buildPage = function (framerate) {
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = "0px";
    canvas = document.createElement('canvas');
    canvas.style.padding = "0px 0px 0px 0px";
    canvas.style.margin = "0px 0px 0px 0px";
    canvas.style.border = "0px";
    ctx = canvas.getContext('2d');
    body.appendChild(canvas);
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
const centerOfScreen = { "x": window.innerWidth, "y": window.innerHeight };
const shapeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerOfScreen.x = window.innerWidth;
    centerOfScreen.y = window.innerHeight;
}
window.addEventListener("resize", shapeCanvas);

const mainLoop = function () {//---------------------------------------------->
    let time = Date.now();
    //delta is how long since last update in milliseconds.
    let delta = (time - oldTime)/1000; //A percentage of 1 second.
    oldTime = time;
    if (program) {
        ctx.fillStyle = '#112';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        do {
            ctx.fillStyle = '#FFF';
            let timestring = time.toString();
            let substring = timestring.substring(7);
            ctx.font = "1em monospace";
            ctx.fillText(substring + '', 30, 30);
        } while (false); //<-- made it you do it once.
        if (program.run) {
            program.run(delta);
        } else {
            console.log('Nothing to loop.. yet?');
        }
    } else {
        console.log('waiting for program to show up...');
    }
}