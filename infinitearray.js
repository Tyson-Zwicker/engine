//A "Multi Dimensional Sparse Array"
//I googled for a better name.. and that's what its called.
//But I'm not calling it that. It's too big and also boring!

const InfiniteArray = function () {
    this.values = {};
    this.set = function (coords, value) {
        let done = false;
        // starting at the top..
        let values = this.values;
        do {
            for (let dim = 0; 0 < coords.length; dim++) {
                //Get all the coordinates that have been defined from this dimension.
                let keys = Object.getOwnPropertyNames(values);
                //Is this the dimension on which the value should be set?
                if (dim === coords.length - 1) {
                    //If so, set it
                    values[coords[dim]] = value;
                    done = true;
                    break;
                    //And get out of here..
                }
                //We're still digging deeper..
                else if (!keys.includes(coords[dim])) {
                    //If this dimesion doesn't contain anything related to the deeper 
                    //dimension, add the deeper dimension and break the for loop, 
                    //And try again..
                    let newDimension = {};
                    newDimension['IsInfinite'] = true;
                    values[coords[dim]] = newDimension;
                    break;
                } else {
                    //Finally, we've either set the value, or created a deeper 
                    //dimension in which to try to place the value.. so move to
                    //that deeper dimension. 
                    //And try again..
                    values = values[coords[dim]];
                    break;
                }
            }
        } while (!done);
    }
    this.get = function (coords) {
        try {
            let value = undefined;
            for (let dim = 0; dim < coords.length; dim++) {
                value = values[dim]; //This throw exception if not there.
                if (dim = coords.length - 1) {
                    //This could be the object you are looking for.  It
                    //could a be deeper array, or it could be just a value.  If it has a property
                    //called "IsInfinite" and that property is true, there is more 
                    //array under this coord.  Otherwise, its a value.
                    return values;
                }
            }
        } catch {
            log(`nothing found @ [${coords.toString()}]`);
            return null
        }
    }
    this.from = function (deeperArray) {
        return new InfiniteArray(deeperArray);
    }
}