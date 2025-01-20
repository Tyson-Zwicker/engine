//A "Multi Dimensional Sparse Array"
//I googled for a better name.. and that's what its called.
//But I'm not calling it that. It's too big and also boring!

const InfiniteArray = function () {
    this.values = {};
    let attempts = 0;
    const _hasKey = function (key, keys) {
        //I am angry I needed to write this, but apparently I did.
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] = key) return true;
        }
        return false;
    }
    this.set = function (coords, value) {
        let done = false;
        // starting at the top..
        let values = this.values;
        do {
            attempts++;
            if (attempts > 5) { return 'infinite loop again...' };
            for (let dim = 0; dim < coords.length; dim++) {
                console.log(`In the ${dim}nth dimension..of ${coords.length}`);
                //Is this the dimension on which the value should be set?
                if (dim === coords.length - 1) {
                    console.log(`--------------HAVE DUG FAR ENOUGH___________`);
                    //If so, set it
                    values[coords[dim]] = value;
                    return;    //And get out of here..
                }
                //We're still digging deeper..
                let keys = Object.getOwnPropertyNames(values);
                console.log(`coords that exist: ${keys}`);
                console.log(`looking for ${coords[dim]} in the "${dim}th" dimension..`);
                if (_hasKey(coords[dim].toString(), keys)) {
                    //If this dimesion doesn't contain anything related to the deeper 
                    //dimension, add the deeper dimension and break the for loop, 
                    //And try again..
                    let newDimension = {};
                    newDimension['IsInfinite'] = true;
                    values[coords[dim]] = newDimension;
                    console.log(`Wasn't there, but it should be now. try again.`);
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
        console.log('getting..');
        let coordsInDim = ObjectGetOwnPropertyNames (this.values);                
        let dim =0;
        let found = false;
        let values = this.values;
        while (!found){
            if (dim===coords.length-1){
                //Its either here, or it isn't, but this is the place..
                if (_hasKey (coords[dim],values)){
                    return values[coords[dim]];
                }else{
                    //It isn't here.
                    return null; 
                }
            }
            //So we are not deep enough, and need to go 
            // down another dimension..
            let keys = Object.getOwnPropertyNames (coords[dim],values);
            if (_hasKey (coords[dim])){
                //There is a coordinate in this dimension, so we move to that
                //sub-dimension..
                 values = values[coords[dim]];
                dim++;
            }else{
                //but there is no coordinate defined for the lower dimension
                //so there's nothing there soo.. it isn't here.
                return null;
            }
        }

    }
    this.from = function (deeperArray) {
        return new InfiniteArray(deeperArray);
    }
}