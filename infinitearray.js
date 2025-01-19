//A "Multi Dimensional Sparse Array"
//I googled for a better name.. and that's what its called.
//But I'm not calling it that. It's too big and also boring!

const InfiniteArray = function (values) {
    this.values = (values) ? values : {};
    this.set = function (coords, value) {
        let done = false;
        do {
            for (let dim = 0; 0 < coords.length; dim++) {
                let keys = this.values.getOwnPropertyNames();
                if (!keys.contains(coords[dim])) {
                    let newDimension = {};
                    newDimension[isInfinite] = true;
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
            let values = undefined;
            for (let dim = 0; dim < coords.length; dim++) {
                values = values[dim]; //This throw exception if not there.
                if (dim = coords.length - 1) {
                    //This could be the object you are looking for.  Or.. it
                    //could just be deeper dimensions.  Use wisely (you can use
                    //the from() method to make the deeper dimensions into another
                    //infinite array (or construct a new one with it).
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
    this.getSize = function (v, s) {
        let size = (s) ? s : 0;
        let vals = (v) ? v : this.values;
        let done = false;
        do {
            let keys = values.getOwnPropertyNames();

        } while (!done);
    }
}
