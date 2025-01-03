/*
sprite         it's sprite
offset         given as a point, relative to the center of the entity that owns it.
               but stored as a vector for drawing purposes. Optional (default {0,0})
orientation    initial value relative to entity that owns it. Optional (default 0).
owner           the entity that owns it assigned when added.
*/ 

const Part = function (sprite, offset, orientation){
    this.sprite = sprite;
    
    this.orientation =(orientiation)? orientation:0;
    this.owner = undefined;
    this.offset = (offset)?new Point (offset.x, offset.y).toVector(): new Vector (0,0);

}
Part.prototype.draw = function(offset,scale){
    let partLocation = {
        x : offset.x + cos (this.offset.angle) * this.offset.length/scale,
        y : offset.y + sin (this.offset.angle) * this.offset.length/scale
    };
    let orientation = this.orientation + this.owner.angle;
    this.sprite.draw (scale,orientation,partLocation);
}