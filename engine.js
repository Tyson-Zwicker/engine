const Engine = function () {
    this.buttonManager = new ButtonManager();
    this.entityManager = new EntityManager();
    this.particleManager = new ParticleManager();
    this.tattler = null;
}
Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action) {
    this.buttonManager.addButton(new Button(name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action));
}
Engine.prototype.addButtonJSON = function (json) {
    let buttons = JSON.parse(json);
    //TODO: load the buttons from a JSON string.
}
Engine.prototype.removeAllButtons = function () {
    this.buttonManager = new ButtonManager();
}
Engine.prototype.addEntity = function (name, sprites, position, angle, velocity, spin, mass, radius, parts) {
    if (!this.entityManager.has(name)) {
        let newEntity = new Entity(name, sprites, position, angle, velocity, spin, mass, radius);
        if (parts) {
            parts.forEach(part => {
                newEntity.addPart(part.clone());
            });
        }
        this.entityManager.add(newEntity);
    }
}
Engine.prototype.addEntitiesJSON = function (json) {
    //TODO: get it all from a JSON string
}
Engine.prototype.removeAllEntities = function () {
    this.entityManager = new EntityManager();
}
Engine.prototype.removeEntity = function (name) {
    this.entityManager.remove(name);
}
Engine.prototype.removeEntityPart = function (entityName, partName) {
    let entity = this.entityManager.get(entityName);
    entity.removePart(partName);
}
Engine.prototype.addEntityPart = function (entityName, part) {
    if (this.entityManager.has(entityName)) {
        let entity = this.entityManager.get(entityName);
        entity.addPart(part.clone());
    }
}
Engine.prototype.setEntityTouchEvent = function (fn) {
    this.entityManager.touchedFn = fn;
}
Engine.prototype.addTattler = function (font, lines, width) {
    this.tattler = new Tattler(font, lines, width);
}
Engine.prototype.removeTattler = function () {
    this.tattler = null;
}
Engine.prototype.tellTattle = function (prefix, msg, color) {
    this.tattler.tell(
        new Tale(prefix, msg, color)
    );
}
Engine.prototype.tellTattleGrouped = function (prefix, msg, color) {
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
    if (this.particleManager) this.particleManager.manage();
    if (this.tattler) this.tattler.tattle();
    this.buttonManager.check();
    this.buttonManager.draw();
   // if (this.entityManager.touchedFn) {
        let entityName = this.entityManager.checkTouch();
        if (entityName === null) entityName = '';
        this.tattler.tellGroup(new Tale('entitycheck', entityName, '#f77'));
   // }
}