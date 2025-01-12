const EntityLabel = function (entity, fontSize, color) {
    this.entity = entity;
    this.fontSize = fontSize;
    this.color = color;
}

EntityLabel.prototype.draw = function (camera, scale) {
    //So we're drawing some text, under the entity, unless its at the bottom of the screen, then it goes on top..
    let rowSize = this.fontSize * 16 + 2;
    //determine y based on closeness of edge..   
    let x = (this.entity.position.x - camera.x) * scale + centerOfScreen.x;
    let y = (this.entity.position.y - camera.y) * scale + centerOfScreen.y + this.entity.radius;
    let drawDirection = 1;
    if (y > screenSize.y) {
        y = (this.entity.position.y - camera.y) * scale + centerOfScreen.y - this.entity.radius;
        drawDirection = -1;
    }
    drawTextCenter(x, y, this.entity.name);
    y += (rowSize * drawDirection);
    drawTextCenter(x, y, `${this.entity.position.x.toFixed(2)},${this.entity.position.y.toFixed(2)})`, this.fontSize);
    y += (rowSize * drawDirection);
    drawTextCenter(x, y, `${this.entity.velocity.x.toFixed(2)},${this.entity.velocity.y.toFixed(2)})`, this.fontSize);
}
