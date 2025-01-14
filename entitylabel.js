const EntityLabel = function (fontSize, color) {
    this.owner = undefined;
    this.fontSize = fontSize;
    this.color = color;
}
EntityLabel.prototype.clone = function () {
    return new EntityLabel(this.fontSize, this.color);
}
EntityLabel.prototype.draw = function (text) {
    if (this.owner) {
        let rowSize = this.fontSize * 16 + 1;
        let height = rowSize * text.length;
        let x = (this.owner.position.x - _camera.x) * _zoom + _centerOfScreen.x;
        let y = (this.owner.position.y - _camera.y) * _zoom + _centerOfScreen.y + this.owner.radius * _zoom;
        let drawDirection = 1;
        let textToDraw = text;
        /*If the sprite is below the bottom the screen, show the label on top instead of below, and reverse the
         order in which the text is drawn */
        if (y + rowSize * text.length > _screenSize.y) {
            y = (this.owner.position.y - _camera.y) * _zoom + _centerOfScreen.y - this.owner.radius * _zoom;
            drawDirection = -1;
            textToDraw = text.toReversed();
        }
        textToDraw.forEach(line => {            
            drawTextCenter(x, y, line, this.fontSize, this.color);
            y += (rowSize * drawDirection);
        });
    }
}
