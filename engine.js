
const Engine = function () {
    this.buttonManager = new ButtonManager();
    this.entityManager = new EntityManager();
    this.particleManager = new ParticleManager();
    this.tattler = null;
}

Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action) {
    ButtonManager.addButton(new Button(name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action));
}
Engine.prototype.addButtonJSON = function (json){
    let buttons = JSON.parse (json);
    //TODO: load the buttons from a JSON string.
}
Engine.protoype.removeAllButtons = function () {
    this.ButtonManager = new ButtonManager();
}
Engine.prototype.addEntity = function (name, sprites, position, angle, velocity, spin, mass, radius, parts) {
    this.EntityManager.addEntity(new Entity(name, sprites, position, angle, velocity, spin, mass, radius));
    parts.forEach (part=>{
        // TODO: add the parts to the entity..
    });
}
Engine.prototype.removeEntryPart = function (entry, part){
    //TODO: you have to convert parts to use a map (its currently an array) before you can do this
    //TODO:  Also you need to give Entity a remove parts method.
}
Engine.prototype.addEntitiesJSON = function (json){
    //TODO: get it all from a JSON string
}
Engine.prototype.removeAllEntities = function () {
    this.EntityManager = new EntityManager();
}
Engine.prototype.removeEntity = function (name) {
    this.entityManager.removeEntity(name);
}
Engine.prototype.addTattler = function (font, lines, width) {
    this.tattler = new Tattler(font, lines, width);
}
Engine.prototype.removeTattler = function () {
    this.tattler = null;
}
Engine.prototype.addTattle = function (prefix, msg, color) {
    this.tattler.tell(
        new Tale(prefix, msg, color)
    );
}
Engine.prototype.addTattleGrouped = function (prefix, msg, color) {
    this.tattler.tellGroup(
        new Tale(prefix, msg, color)
    );
}
Engine.prototype.addParticle = function (position, velocity, lifespan, rgb) {
    this.particleManager.particles.push(new Particle(position, velocity, lifespan, rgb));
}
Engine.prototype.addParticles = function (position, quantity, rgb, lifeMinMax, arc, magnitude) {
    this.particleManager.addBurst(position, quantity, rgb, lifeMinMax, arc, magnitude);
}
Engine.prototype.do = function () {
    this.entityManager.manage();
    this.buttonManager.check();
    this.buttonManager.draw();
    if (this.particleManager) this.particleManager.manage();
}
