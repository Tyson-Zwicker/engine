/* 
    An Entity knows, where it is, how fast its moving, where its 
    facing, how quickly its spinning, and what it looks like (in
    the form of a collection sprites.)
    
    It has functions to do update the position and facing,
    change the velocity and draw the sprites.
*/
const Entity = function (name, sprites, position, angle, velocity, spin, mass) {
    this.name = name;
    this.position = position;
    this.angle = angle;
    this.velocity = velocity;
    this.spin = spin;
    this.sprites = sprites;
    this.mass = mass;
}

Entity.prototype.move = function (delta) {
    this.angle += this.spin;
    this.position.x += (this.velocity.x / delta);
    this.position.y += (this.velocity.y / delta);
}

Entity.prototype.push = function (vector) {
    this.velocity.x += cos(vector.a) * vector.l / this.mass;
    this.velocity.y += sin(vector.a) * vector.l / this.mass;
}
Entity.prototype.draw = function (camera, scale) {
    spriteLocation = {
        x: (this.position.x - camera.x) / scale + canvas.width / 2,
        y: (this.position.y - camera.y) / scale + canvas.height / 2
    };
    this.sprites.forEach ((s)=>{
        s.draw(scale, this.angle, spriteLocation);
    });
}