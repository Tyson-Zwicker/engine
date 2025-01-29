const SnapPanel = function (x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.snap = undefined;
    this.snapPoints = undefined;
    this.hSym = false;
    this.vSym = false;
    //for these think (x,y)<-->(a,b)  //These are undefined until span is defined;
    this.a0 = undefined;//left most x for grid line (depends on snap)
    this.b0 = undefined;//upper most y for grid line (depends on snap)
    this.a1 = undefined//right most x for gridline (depends on snap)
    this.b1 = undefined;//lower most y for grid line (depends on snap)
}
SnapPanel.prototype.setSnap = function (snap) {
    this.snap = snap;    
    let cx = (this.x1 - this.x0) / 2;
    let cy = (this.y1 - this.y0) / 2;
    let numxlines = Math.trunc((this.x1 - this.x0) / snap);
    let numylines = Math.trunc ((this.y1 - this.y0) / snap);
    console.log (`numxlines${numxlines}`);
    console.log (`numylines${numylines}`);
    this.a0 = cx - numxlines * snap;
    this.b0 = cy - numylines * snap;
    this.a1 = cx + numxlines * snap;
    this.b1 = cy + numylines * snap;
    this.snapPoints = [];
    let i=0;j=0;
    for (let x = this.a0; x < this.a1; x += snap) {        
        this.snapPoints.push ([]);
        for (let y = this.b0; y < this.b1; y += snap) {
            if (!this.snapPoints[i]){
                this.snapPoints[i].push ([]);
            }
            this.snapPoints[i][j] = {x,y};
            j++;
        }
        i++; j=0;
    }
    
}
SnapPanel.prototype.setSymmetry = function (horizontal, vertical) {
    this.vSym = vertical;
    this.hSym = horizontal;
}

SnapPanel.prototype.hovered = function (x,y){
    //How do you iterate over an IArray? 
}
SnapPanel.prototype.clicked = function (x, y) {
    if (!snap) {
        throw Error('Cannot draw snap Panel: Snap level not declared.');
    } else {

    }
}
SnapPanel.prototype.draw = function () {
    if (!snap) {
        throw Error('Cannot draw snap Panel: Snap level not declared.');
    } else {
        for (let x = this.sx; x < this.ex; x += this.snap) {
            drawLine(x, this.y0, x, this.y1, '#777', 1);
        }
        for (let y = this.sy; y < this.ey; y += this.snap) {
            drawLine(this.x0, y, this.x1, y, '#777', 1);
        }
    }
}
