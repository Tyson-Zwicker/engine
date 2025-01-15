
const Engine = function () {
    this.buttonManager = new ButtonManager();
    this.entityManager = new EntityManager();
    this.particleManager = new ParticleManager();
    this.tattler = null;
}

Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action) {
    this.buttonManager.addButton(new Button(name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action));
}
Engine.prototype.addButtonJSON = function (json){
    let buttons = JSON.parse (json);
    //TODO: load the buttons from a JSON string.
}
Engine.prototype.removeAllButtons = function () {
    this.buttonManager = new ButtonManager();
}
Engine.prototype.addEntity = function (name, sprites, position, angle, velocity, spin, mass, radius, parts) {
    let newEntity = new Entity(name, sprites, position, angle, velocity, spin, mass, radius);
    parts.forEach (part=>{
        newEntity.addPart (part);
    });
    this.EntityManager.addEntity(newEntity);
}
Engine.prototype.removeEntryPart = function (entityName, partName){
    let entity = enitityManager.get (entityName);
    entity.removePart (partName);
}
Engine.prototype.addEntitiesJSON = function (json){
    //TODO: get it all from a JSON string
}
Engine.prototype.removeAllEntities = function () {
    this.entityManager = new EntityManager();
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
    if (this.tattler) tattler.tattle();
}
