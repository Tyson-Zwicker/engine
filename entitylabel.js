const EntityLabel = function (entity, fontSize, color) {
    this.entity = entity;
    this.fontSize = fontSize;
    this.color = color;
}

EntityLabel.prototype.draw = function (text) {
    let rowSize = this.fontSize * 16 + 2;
    let height = rowSize * text.length;
    let x = (this.entity.position.x - camera.x) * zoom + centerOfScreen.x;
    let y = (this.entity.position.y - camera.y) * zoom + centerOfScreen.y + this.entity.radius * zoom;
    let drawDirection = 1;
    let textToDraw = text;
    /*If the sprite is below the bottom the screen, show the label on top instead of below, and reverse the
     order in which the text is drawn */
    if (y + rowSize * text.length > screenSize.y) {
        y = (this.entity.position.y - camera.y) * zoom + centerOfScreen.y - this.entity.radius * zoom;
        drawDirection = -1;
        textToDraw = text.toReversed();
    }
    
    textToDraw.forEach (line =>{
        drawTextCenter(x, y, line, this.fontSize);        
        y += (rowSize * drawDirection);
    });
}
