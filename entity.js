/* 
    An Entity knows, where it is, how fast its moving, where its 
    facing, how quickly its spinning, and what it looks like (in
    the form of a collection sprites.)
    
    It has functions to do update the position and facing,
    change the velocity and draw the sprites.
*/
const Entity = function (name, sprites, position, angle, velocity, spin, mass, radius) {
    this.name = name;
    this.position = position;
    this.angle = angle;
    this.velocity = velocity;
    this.spin = spin;
    this.sprites = sprites;
    this.mass = mass;
    this.parts = new Map();
    this.radius = radius; //This should match the furthest point of any of the sprites from the entities center.
    this.label = undefined;
    this.propertiesToLabel;
}
/*The label defines the look of the label,
 the properties [{property, label},...] parameters is a list that tells it what to show.
 It will show the specified property of the enity, and prefix it with "label".
 If the property is an object, it's toString() method is
 called. Point and Vector already have one.*/

Entity.prototype.assignLabel = function (label, properties) {
    this.label = label;
    this.propertiesToLabel = properties;
    label.owner = this;
}
Entity.prototype.addPart = function (part) {
    this.parts.set(part.name, part);
    part.owner = this;
}
Entity.prototype.removePart = function (partName) {
    this.parts.delete(partName);
}

Entity.prototype.move = function () {
    this.angle += this.spin * _delta;
    this.position.x += this.velocity.x * _delta;
    this.position.y += this.velocity.y * _delta;
    if (this.angle<0) this.angle+=TAU;
    if (this.angle>TAU) this.angle-=TAU;
}
Entity.prototype.spin = function (force) {
    this.velocity.x += cos(vector.a) * vector.l / this.mass;
    this.velocity.y += sin(vector.a) * vector.l / this.mass;
}
Entity.prototype.push = function (vector) {
    this.velocity.x += cos(vector.a) * vector.l / this.mass;
    this.velocity.y += sin(vector.a) * vector.l / this.mass;
}
Entity.prototype.draw = function () {
    spriteLocation = {
        x: (this.position.x - _camera.x) * _zoom + _centerOfScreen.x,
        y: (this.position.y - _camera.y) * _zoom + _centerOfScreen.y
    };
    this.sprites.forEach((s) => {
        s.draw(this.angle, spriteLocation);
    });
    this.parts.forEach((p) => {
        p.draw(spriteLocation);
    });
    if (this.label) {
        text = [];
        this.propertiesToLabel.forEach(property => {
            if (typeof (this[property.name]) === 'object') {
                text.push(`${property.label}${this[property.name].toString()}`);
            }
            else if (typeof (this[property.name]) == 'number'){
                text.push(property.label + this[property.name].toFixed(3));
            }else{
                text.push(property.label + this[property.name]);
            }
        });
        this.label.draw(text);
    }
}
const EntityManager = function (entities) {
    this.entities = new Map();
    if (entities) {
        entities.forEach(entity => {
            this.entities.set(entity.name, entity);
        });
    }
}
EntityManager.prototype.manage = function () {
    let keys = this.entities.keys();
    for (let key of keys) {
        let entity = this.entities.get(key);
        entity.move();
        entity.draw();
        //think..        
    }
}
EntityManager.prototype.addEntity = function (entity) {
    if (this.entities.has(entity.name)) {
        throw error(`Entity with name ${entity.name} already exists.`);
    }
    this.entities.set(entity.name, entity);
}
EntityManager.prototype.removeEntity = function (entity) {
    this.entities.delete(entity.name);
}
EntityManager.prototype.getEntity = function (entity) {
    this.entities.get(entity);
}
