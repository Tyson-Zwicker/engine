const EntityLabel = function (entity, fontSize, color) {
    this.entity = entity;
    this.fontSize = fontSize;
    this.color = color;
}

EntityLabel.prototype.draw = function (text, camera, scale) {
    //So we're drawing some text, under the entity, unless its at the bottom of the screen, then it goes on top..

    let rowSize = this.fontSize * 16 + 2;
    let height = rowSize * text.length;
   
    /*
    let width =0;
    text.forEach (line =>{
        lineWidth = getTextWidth (line, `${this.fontSize}em monospace`);
        width = (lineWidth>width)? lineWidth: width; 
    });
    */

    //determine y based on closeness of edge..   
    let x = (this.entity.position.x - camera.x) * scale + centerOfScreen.x;
    let y = (this.entity.position.y - camera.y) * scale + centerOfScreen.y + this.entity.radius * scale;
    let drawDirection = 1;
    if (y > screenSize.y) {
        y = (this.entity.position.y - camera.y) * scale + centerOfScreen.y - this.entity.radius * scale;
        drawDirection = -1;
    }
    text.forEach (line =>{
        drawTextCenter(x, y, line, this.fontSize);        
        y += (rowSize * drawDirection);
    });
}
