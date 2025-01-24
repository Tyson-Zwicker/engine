//You do not need to specify any coordinates, or colors, the panel will assign the colors and dimensions
// when you add the buttons. If it is a part of a Radio Group, then its group is assigned by a call to
// the button manager when you add the buttons.
const VerticalButtonPanel = function (name, colors, x, y, width, buttonHeight, fontSize, outerBorder, radioGroup) {
    this.name = name;
    this.buttons = [];
    this.x = x;  //uppper left hand corner...
    this.y = y;
    this.colors = colors;
    this.width = width;
    this.height = undefined;
    this.buttonHeight = buttonHeight;
    this.fontSize = fontSize;
    this.outerBorder = outerBorder; //distance between panel left/right edge and button also vertical spacing between buttons.
    this.radioGroup = (radioGroup) ? radioGroup : null;
}
VerticalButtonPanel.prototype.add = function (buttonDefinitions) {
    //buttonDefinitions is an array of {name, text, action} objects.
    //They'll be drawn in the order they appear in the array, top to bottom

    let y = this.y + this.outerBorder;
    buttonDefinitions.forEach(def => {
        //name, text, x0, y0, x1, y1, fontsize, buttonColors, actionFn
        let button = new Button(def.name, def.text,
            this.x + this.outerBorder,
            y,
            this.x + this.width - this.outerBorder * 2,
            y + this.buttonHeight,
            this.fontSize, this.colors, def.actionFn);
        this.buttons.push(button);
        y += this.buttonHeight + this.outerBorder;
    });
    this.height = y + this.y + this.outerBorder * 2;
}

const HorizontalButtonPanel = function (name, colors, x, y, height, buttonWidth, fontSize, outerBorder, radioGroup) {
    this.name = name;
    this.buttons = [];
    this.x = x;  //uppper left hand corner...
    this.y = y;
    this.colors = colors;
    this.width = undefined;
    this.height = height;
    this.buttonWidth = buttonWidth;
    this.fontSize = fontSize;
    this.outerBorder = outerBorder; //distance between panel left/right edge and button also vertical spacing between buttons.
    this.radioGroup = (radioGroup) ? radioGroup : null;
}
HorizontalButtonPanel.prototype.add = function (buttonDefinitions) {
    let x = this.x + this.outerBorder;
    buttonDefinitions.forEach(def => {
        //name, text, x0, y0, x1, y1, fontsize, buttonColors, actionFn
        let button = new Button(def.name, def.text,
            x,
            this.y,
            x + this.buttonWidth + this.outerBorder,
            this.y + this.height,
            this.fontSize, this.colors, def.actionFn
        );
        console.log (`x ${x} this.buttonWidth`);
        this.buttons.push(button);
        x += this.buttonWidth + this.outerBorder;
    });
    this.width = x + this.y + this.outerBorder * 2;
}