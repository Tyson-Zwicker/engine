const SnapPanel = function (x0, y0, x1, y1) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.hSym = false;
    this.vSym = false;
    this.hoveredPoint = null;
    this.pressedPoint = null;
    //for these think (x,y)<-->(a,b)  //These are undefined until span is defined;
    this.a0 = undefined;//left most x for grid line (depends on snap)
    this.b0 = undefined;//upper most y for grid line (depends on snap)
    this.a1 = undefined//right most x for gridline (depends on snap)
    this.b1 = undefined;//lower most y for grid line (depends on snap)
    this.snap = undefined;
    this.snapPoints = undefined;
    this.numXLines = undefined;
    this.numYLines = undefined;
    this.getNearestPoint = function (point) {        
        if (snap) {
            let shortestDistance = undefined;
            let nearestPoint = undefined;
            for (let i = 0; i < this.numXLines; i++) {
                for (let j = 0; j < this.numYLines; j++) {
                    let distance = distance (this.snapPoints [x][y], point);
                    if (!shortestDistance || shortestDistance>distance){
                        shortestDistance = distance;
                        nearestPoint = this.snapPoint[i][j];
                    }
                }
            }
            return nearestPoint;
        } 
        throw new Error ('cannot calculate distance: snap level not declared');
    }
}


//TODO: Its drawing the snapPoints in the upper left hand corner so you are not accounting for the offset
//of the panel... I think.

SnapPanel.prototype.setSnap = function (snap) {
    this.snap = snap;
    console.log (`snap set to  ${this.snap}`);
    let cx = (this.x1 + this.x0) / 2;
    let cy = (this.y1 + this.y0) / 2;
    this.numXLines = Math.trunc((this.x1 - this.x0) / snap);
    this.numYLines = Math.trunc((this.y1 - this.y0) / snap);
    this.a0 = cx - this.numXLines/2 * snap;
    this.b0 = cy - this.numYLines/2 * snap;
    this.a1 = cx + this.numXLines/2 * snap;
    this.b1 = cy + this.numYLines/2 * snap;
    this.snapPoints = [];
    let i = 0; j = 0;
    for (let x = this.a0; x < this.a1; x += snap) {
        this.snapPoints.push([]);
        for (let y = this.b0; y < this.b1; y += snap) {
            if (!this.snapPoints[i]) {
                this.snapPoints[i].push([]);
            }
            this.snapPoints[i][j] = { x, y };
            j++;
        }
        i++; j = 0;
    }
    console.log (`x0 ${this.x0}, x1 ${this.x1}`);
    console.log (`y0 ${this.x0}, y1 ${this.y1}`);
    console.log (`cx ${cx} cy ${cy}, a0 ${this.a0} b0 ${this.b0} a1 ${this.a1}, b1 ${this.b1}`);
    console.log (`numXLines ${this.numXLines}, numYLines ${this.numYLines}`);
    console.log (`after calling setSnap ${snap} this.snapPoints:`);
    console.log (this.snapPoints);
}
SnapPanel.prototype.setSymmetry = function (horizontal, vertical) {
    this.vSym = vertical;
    this.hSym = horizontal;
}
//set hoveredPoint, used internally to highlight that point when drawn.
SnapPanel.prototype.reactToHover = function (point) {
    if (this.snap) {
        if (bounded (point, {x0,y0,x1,y1})){
            this.hoveredPoint = this.getNearestPoint (point)
        }else{
            this.hoveredPoint = null;
        }
    } else {
        throw Error('snappanel: Snap level not declared.');
    }
}
//set pressPoint, used internally to highlight that point when drawn 
//AND determine if its been clicked once the mouse comes back up.
SnapPanel.prototype.reactToMouseDown = function (point) {
    if (this.snap) {
        if (bounded (point, {x0,y0,x1,y1})){
            this.pressedPoint = this.getNearestPoint (point);
        }else{
            this.hoveredPoint = null;
        }
    } else {
        throw Error('snappanel: Snap level not declared.');
    }
}
//returns the snapPoints that was clicked or null if no point was clicked.
SnapPanel.prototype.reactToMouseUp = function (point) {
    if (this.snap) {
        if (bounded (point, {x0,y0,x1,y1})){
            let nearestPoint = this.getNearestPoint (point);
            if (nearestPoint.x === this.pressedPoint.x && nearestPoint.y === this.pressedPoint.y){
                return  nearestPoint;
            }else{
                this.pressedPoint = null;
                return null;
            }
        }else{
            this.pressedPoint = null
            return null;
        }
    } else {
        throw Error('snappanel: Snap level not declared.');
    }
}
SnapPanel.prototype.draw = function () {
    if (!this.snap) {
        throw Error('Cannot draw snappanel: Snap level not declared.');
    } else {
        //Draw the lines..
        for (let x = this.sx; x < this.ex; x += this.snap) {
            drawLine(x, this.y0, x, this.y1, '#777', 1);
        }
        for (let y = this.sy; y < this.ey; y += this.snap) {
            drawLine(this.x0, y, this.x1, y, '#777', 1);
        }
        //draw symetry lines along centeral gridlines..
        if (this.vSym) {
            drawLine (this.cx,this.y0, this.cx,this.y1, '#666');
        }
        if (this.hSim){
            drawLine (this.x0,cy, this.x1, cy,'#666');
        }
        console.log (`xlines${this.numXLines}`);
        console.log (`ylines${this.numYLines}`);
        for (let i=0;i< this.numXLines; i++){
            for (let j=0;j<this.numYLines;j++){
                let x = this.snapPoints[i][j].x;
                let y = this.snapPoints[i][j].y;
                drawBox (x-0.5, y-0.5, x+0.5, y+0.5,'#c00',true);
            }
        }
        //draw small box at each snapPoints..
        //highlight hovered and highlight pressed with different color..
        drawBox (this.x0,this.y0, this.x1, this.y1,'#0f9');
    }
}
