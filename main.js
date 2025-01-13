let _canvas = undefined;
let _ctx = undefined;
const _camera = new Point(0, 0);
let trackingcamera
let _zoom = 1;
let _zoomRate = 0.1;
let _zoomOnWheel = false;
let _delta = undefined;
let _oldTime = new Date();
let _time = new Date();
const _centerOfScreen = { "x": window.innerWidth / 2, "y": window.innerHeight / 2 };
const _screenSize = { "x": window.innerWidth, "y": window.innerHeight };


const _mouse = {
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
const _resizeCanvas = function () {
    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
    _centerOfScreen.x = window.innerWidth / 2;
    _centerOfScreen.y = window.innerHeight / 2;
    _screenSize.x = window.innerWidth;
    _screenSize.y = window.innerHeight;
}
const _start = function (framerate, enableWheelZoom) {
    _zoomOnWheel = enableWheelZoom;
    let body = document.getElementsByTagName('body')[0];
    body.style.margin = "0px";
    _canvas = document.createElement('canvas');
    _canvas.style.padding = "0px 0px 0px 0px";
    _canvas.style.margin = "0px 0px 0px 0px";
    _canvas.style.border = "0px";
    _ctx = _canvas.getContext('2d');
    body.appendChild(_canvas);
    window.addEventListener("resize", _resizeCanvas);
    _canvas.onwheel = function (e) {
        _mouse.wheel = {
            where: e.deltaY,
            when: Date.now()
        }
    }
    _canvas.onmousemove = function (e) {
        _mouse.move = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now()
        }
    }
    _canvas.onmousedown = function (e) {
        _mouse.down = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now(),

        };
        _mouse.buttonDown = true;
    }
    _canvas.onmouseup = function (e) {
        _mouse.up = {
            where: new Point(e.clientX, e.clientY),
            when: Date.now(),

        };
        _mouse.buttonDown = false;
    }
    _resizeCanvas();

    _mainLoop()
    if (framerate) setInterval(_mainLoop, framerate);
}

const _mainLoop = function () {
    _time = Date.now();
    _delta = (_time - _oldTime) / 1000; //the fraction of 1 second since last loop.
    _oldTime = _time;
    console.log (`mainloop delta ${_delta}`);
    
    if (program) {
        _ctx.fillStyle = '#112';
        _ctx.fillRect(0, 0, _canvas.width, _canvas.height);
        do {
            drawTextLeft(10, 10, _time.toString().substring(7), 1);
        } while (false);
        if (program.run) {
            program.run();
        } else {
            console.log('Nothing to loop.. yet?');
        }
    } else {
        console.log('waiting for program to show up..');
    }

    if (_zoomOnWheel && _mouse.wheel.where !== 0) {
        let sign = Math.sign(_mouse.wheel.where);
        _zoom += sign * _zoomRate;
        if (_zoom < 0.02) {
            _zoom = 0.02;
        }
        if (_zoom > 1) {
            _zoom = 1;
        }
    }
    _mouse.wheel.where = 0;//reset the scroll 'wheel _delta' to none (0)
    
}