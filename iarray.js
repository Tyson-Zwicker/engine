//A multidimensional sparse "array" but its not really an array because it uses "keys" not indices,
//so it more like a "Dictionary" that can contain mor "inner" Dictionaries, or a single value.

const IArray = function () {
    this.values = {};
    this.values['isInfinite'] = true;
}
//Given an array of keys, and value..
IArray.prototype.set = function (coords, obj) {
    if (!Array.isArray (coords)){
        throw Error ('coords must be specified in an array.');
    }
    let tempVals = this.values;
    let depth = 0;
    let values = this.values;
    do {
        if (depth === coords.length - 1) {
            //all keys satified, place object here.
            values[coords[depth].toString()] = obj;
            return;
        }
        if (values[coords[depth].toString()]) {
            //found the inner dictionary that is part of the set of keys..
            //loop again to see if we're deep enough to set the value.
            values = values[coords[depth].toString()];
            depth++;
        } else {
            //One of the keys doesn't exist yet, so create the inner dictionary,
            //  and loop again to see if we're deep enough to assign the value..
            let innerDictionary = {};
            innerDictionary['isInfinite'] = true;
            values[coords[depth].toString()] = innerDictionary;
        }
    } while (true);
}
IArray.prototype.get = function (coords) {
    if (!Array.isArray (coords)){
        throw Error ('coords must be specified in an array.');
    }
    let values = this.values;
    let depth = 0;
    do {
        if (depth === coords.length - 1) {
            if (values[coords[depth].toString()]) {
                //we've reached the specified keys..
                if (values[coords[depth]]['isInfinite']) {
                    //but instead of finding a value, we find an inner dictionary..
                    //so return all the keys of the dictionary as simple array.
                    return Object.getOwnPropertyNames(values[coords[depth]]);
                } else {
                    //and we've found a value to return.
                    return values[coords[depth]]
                }
            } else {
                return null;
            }
        }
        if (values[coords[depth].toString()]) {
            values = values[coords[depth].toString()];
            depth++;
        } else {
            return null;
        }

    } while (true);
}
