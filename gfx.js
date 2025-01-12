const drawBox = function (x0, y0, x1, y1, color, fill, thickness) {
    ctx.beginPath();
    if (fill) {
        ctx.fillStyle = color;
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    } else {
        ctx.strokeWidth = 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = (thickness) ? thickness : 1;
        ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
    ctx.closePath();
}
const drawArc = function (x, y, r, a0, a1, color, thickness) {
    ctx.beginPath();
    ctx.strokeWidth = 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = (thickness) ? thickness : 1;
    ctx.arc(x, y, r, a0, a1);
    ctx.stroke();
}
const drawCircle = function (x, y, r, color, fill, thickness) {
    ctx.lineWidth = (thickness) ? thickness : 1;
    drawArc(x, y, r, 0, TAU, color);
    if (fill) {
        ctx.fill();
    }
}
const drawPie = function (x, y, r, a0, a1, color, fill, thickness) {
    ctx.lineWidth = (thickness) ? thickness : 1;
    let x0 = x + cos(a0) * r;
    let y0 = y + sin(a0) * r;
    let x1 = x + cos(a1) * r;
    let y1 = y + sin(a1) * r;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(x0, y0);
    drawArc(x, y, r, a0, a1);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
    if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
    }
}
const drawPixel = function (x, y, color) {
    let previousSize = ctx.strokeWidth;
    let strokeStyle = 1;
    drawBox(x, y, x + 1, y + 1, color);
    ctx.strokeWidth = previousSize;
}
const drawLine = function (x0, y0, x1, y1, thickness, color) {
    ctx.strokeStyle = (color) ? color : '#fff';
    ctx.strokeWidth = (thickness) ? thickness : 1;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath()
    ctx.stroke();
}
const drawTextCenter = function (x, y, text, size, color) {
    ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = (color) ? color : '#ccc';
    ctx.fillText(text, x, y);
}
const drawTextLeft = function (x, y, text, size, color) {
    ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    ctx.textBaseline = "middle";
    ctx.textAlign = "start";
    ctx.fillStyle = (color) ? color : '#ccc';
    ctx.fillText(text, x, y);
}
const drawTextRight = function (x, y, text, size, color) {
    ctx.font = (size) ? `${size}em monospace` : '0.75em monospace';
    ctx.textBaseline = "middle";
    ctx.textAlign = "end";
    ctx.fillStyle = (color) ? color : '#ccc';
    ctx.fillText(text, x, y);
}
const rgbToHex =function (r,g,b){
    return `#${Math.trunc(r).toString(16)}${Math.trunc(g).toString(16)}${Math.trunc(b).toString(16)}`
}
function getTextWidth(text, font) {
    ctx.font = font;
    const metrics = ctx.measureText(text);
    return metrics.width;
}