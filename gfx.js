const drawBox = function (x0, y0, x1, y1, color, fill, thickness) {
    _ctx.beginPath();
    if (fill) {
        _ctx.fillStyle = color;
        _ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    } else {
        _ctx.strokeStyle = color;
        _ctx.lineWidth = (thickness) ? thickness : 1;
        _ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
    _ctx.closePath();
}
const drawArc = function (x, y, r, a0, a1, color, thickness) {
    _ctx.beginPath();
    _ctx.strokeStyle = color;
    _ctx.lineWidth = (thickness) ? thickness : 1;
    _ctx.arc(x, y, r, a0, a1);
    _ctx.stroke();
}
const drawCircle = function (x, y, r, color, fill, thickness) {
    _ctx.lineWidth = (thickness) ? thickness : 1;
    drawArc(x, y, r, 0, TAU, color);
    if (fill) {
        _ctx.fill();
    }
}
const drawPie = function (x, y, r, a0, a1, color, fill, thickness) {
    _ctx.lineWidth = (thickness) ? thickness : 1;
    let x0 = x + cos(a0) * r;
    let y0 = y + sin(a0) * r;
    let x1 = x + cos(a1) * r;
    let y1 = y + sin(a1) * r;
    _ctx.beginPath();
    _ctx.strokeStyle = color;
    _ctx.moveTo(x, y);
    _ctx.lineTo(x0, y0);
    drawArc(x, y, r, a0, a1);
    console.log (x,y,r);
    _ctx.lineTo(x, y);
    _ctx.closePath();
    _ctx.stroke();
    if (fill) {
        _ctx.fillStyle = color;
        _ctx.fill();
    }
}
const drawPixel = function (x, y, color) {
    let previousSize = _ctx.strokeWidth;
    let lineWidth = 1;
    drawBox(x, y, x + 1, y + 1, color);
    _ctx.strokeWidth = previousSize;
}
const drawLine = function (x0, y0, x1, y1, color, thickness) {
    _ctx.strokeStyle = (color) ? color : '#fff';
    _ctx.lineWidth = (thickness) ? thickness : 1;
    _ctx.beginPath();
    _ctx.moveTo(x0, y0);
    _ctx.lineTo(x1, y1);
    _ctx.closePath()
    _ctx.stroke();
}
const drawTextCenter = function (x, y, text, size, color) {
    _ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    _ctx.textBaseline = "middle";
    _ctx.textAlign = "center";
    _ctx.fillStyle = (color) ? color : '#ccc';
    _ctx.fillText(text, x, y);
}
const drawTextLeft = function (x, y, text, size, color) {
    _ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    _ctx.textBaseline = "middle";
    _ctx.textAlign = "start";
    _ctx.fillStyle = (color) ? color : '#ccc';
    _ctx.fillText(text, x, y);
}
const drawTextRight = function (x, y, text, size, color) {
    _ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    _ctx.textBaseline = "middle";
    _ctx.textAlign = "end";
    _ctx.fillStyle = (color) ? color : '#ccc';
    _ctx.fillText(text, x, y);
}
const rgbToHex =function (r,g,b){
    return `#${Math.trunc(r).toString(16)}${Math.trunc(g).toString(16)}${Math.trunc(b).toString(16)}`
}
function getTextWidth(text, font) {
    _ctx.font = font;
    const metrics = _ctx.measureText(text);
    return metrics.width;
}