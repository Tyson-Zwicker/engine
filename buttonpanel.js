//You do not need to specify any coordinates, or colors, the panel will assign the colors and dimensions.

const VerticalButtonPanel = function (name, colors, x, y, width, desiredHeight, fontSize, isRadio, innerBorder, outerBorder) {
    this.name = name;
    this.buttons = [];
    this.x = x;  //uppper left hand corner...
    this.y = y;
    this.border = border;
    this.title = title;
    this.colors = colors;
    this.width = width;
    this.desiredHeight = desiredHeight;
    this.fontSize = fontSize;
    this.isRadio = isRadio;
    this.innerBorder = innerBorder; //vertical distance between text and button edge.
    this.outerBorder = outerBorder; //distance between panel left/right edge and button also vertical spacing between buttons.
}
VerticalButtonPanel.prototype.add = function (buttonDefinitions) {
    //buttonDefinitions is an array of {name, text, action} objects.
    //They'll be drawn in the order they appear in the array, top to bottom

    let buttonHeight = getTextHeight('M', `${this.fontSize}em monospace`) + this.innerBorder * 2;
    if (buttonHeight * buttonDefinitions.length + this.outerBorder * 2 > this.desiredHeight) {
        throw Error('Vertical Button Panel: cannot fit defined buttons into desired height.');
    }
    let y = this.y + this.outerBorder;
    buttonDefinitions.forEach(def => {
        let button = new Button(def.name, def.text,
            this.x + this.outerBorder, y,
            this.x + this.width - this.outerBorder * 2,
            this.y + buttonHeight,
            this.fontsize, this.buttonColors, def.actionFn);
        y += buttonHeight + this.outerBorder;
    });
    if (this.isRadio){
        //TODO: make it a part of a radio group..
    }
}

//TODO:  Write a test!