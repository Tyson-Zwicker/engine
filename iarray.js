const IArray = function () {
    this.values = {};
    this.values['isInfinite'] = true;
}
IArray.prototype.set = function (coords, obj) {
    let tempVals = this.values;
    let dim = 0;
    let values = this.values;
    do {
        if (dim === coords.length - 1) {
            values[coords[dim].toString()] = obj;
            return;
        }
        if (values[coords[dim].toString()]) {
            values = values[coords[dim].toString()];
            dim++;
        } else {
            let higherDim = {};
            higherDim['isInfinite'] = true;
            values[coords[dim].toString()] = higherDim;
        }
    } while (true);
}
IArray.prototype.get = function (coords) {
    let values = this.values;
    let dim = 0;
    do {
        if (dim === coords.length - 1) {
            if (values[coords[dim].toString()]) {
                return values[coords[dim].toString()]
            } else {
                return null;
            }
        }
        if (values[coords[dim].toString()]) {
            values = values[coords[dim].toString()];
            dim++;
        } else {
            return null;
        }

    } while (true);
}