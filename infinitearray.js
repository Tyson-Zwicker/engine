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
            if (coords.length === 0) {
                return this.values[coords[0]];
            } else {
                let values = this.values;
                for (let dim = 0; dim < coords.length; dim++) {
                    values = values[dim]; //This throw exception if not there.
                    if (dim = coords.length - 1) {
                        //This COULD be the object you are looking for.  Or.. it
                        //COULD BE deeper dimensions into the array.
                        return values;
                    }
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
