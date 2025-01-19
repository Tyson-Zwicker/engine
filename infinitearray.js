//A "Multi Dimensional Sparse Array"
//I googled for a better name.. and that's what its called.
//But I'm not calling it that. It's too big and also boring!

const InfiniteArray = function (values) {
    this.values = (values) ? values : {};
    this.set = function (coords, value) {
        let done = false;
        do {
            for (let dim = 0; 0 < coords.length; dim++) {
                let keys = Object.getOwnPropertyNames(this.values);
                if (!keys.includes(coords[dim])) {
                    let newDimension = {};
                    newDimension['IsInfinite'] = true;
                    this.values[coords[dim]] = {};
                    break;
                }
                if (dim === coords.length - 1) {
                    this.values[coords[dim]] = value;
                    done = true;
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