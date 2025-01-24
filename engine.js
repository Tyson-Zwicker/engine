/* TODO:  Add *more* snarky log comments, instead of just, "failing gracefully"
   ACTUALLY: Let's start throwing some actual errors instead of just backtracking 
   through code to figure out where the thing didn't do what you wanted it to do.
*/
// If you want to use the parts by themselves there should be no feedback- you're doing you.
//  But If your using this API, this is the place to recieve complaints about "wrong"
//  things that don't crash anything should be quitely mentioned in the console.

const Engine = function () {
    this.buttonManager = new ButtonManager();
    this.entityManager = new EntityManager();
    this.particleManager = new ParticleManager();
    this.tattler = null;
    this.backgroundTouchFn = undefined;
}
Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, buttonColors, action) {
    this.buttonManager.addButton(new Button(name, text, x0, y0, x1, y1, fontsize, buttonColors, action));
}
Engine.prototype.removeButton = function (button) {
    this.buttonManager.removeButton (button);
}
Engine.prototype.setButtonAsToggle = function(button,untoggleFn){
    button.untoggledFn = untoggledFn;
}
Engine.prototype.setButtonAsRadio = function(button, groupName){
    this.buttonManager.addButtonToRadioGroup (button, GroupName);
}
Engine.prototype.removeRadioButtonGroup = function(groupname) {
    this.buttonManager.removeRadioGroup (groupName);
}
Engine.prototype.addButtonJSON = function (json) {
    let buttons = JSON.parse(json);
    //TODO: load the buttons from a JSON string.
}
Engine.prototype.removeAllButtons = function () {
    this.buttonManager = new ButtonManager();
}
Engine.prototype.addPanel = function (panel){
    this.buttonManager.addPanel (panel);
}
Engine.prototype.removePanel = function (panelName){
    this.buttonManager.remove (panelName);
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
    if (entity) {
        entity.removePart(partName);
    } else {
        log(`you've tried to remove ${partName} from ${entityName} but ${entityName} doesn't exist.`);
    }
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
Engine.prototype.setBackgroundTouchEvent = function (fn) {
    this.backgroundTouchFn = fn;
}
Engine.prototype.addTattler = function (fontSize, lines, width) {
    this.tattler = new Tattler(fontSize, lines, width);
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
    let keepChecking = true;
    this.entityManager.manage();
    if (this.particleManager) this.particleManager.manage();
    if (this.tattler) this.tattler.tattle();
    if (this.buttonManager.check()) {
        keepChecking = false;
    };
    this.buttonManager.draw();
    if (keepChecking) {
        if (this.entityManager.touchedFn) {
            let entityName = this.entityManager.checkTouch();
            if (entityName !== null) {
                keepChecking = false;
            }
        }
    }
    //If nothing else (button or entity is touched), there is a defined backgroundTouch function,
    //call it.  The reciever should know to check _mouse.where (if they wish).
    if (keepChecking) {
        if (this.backgroundTouchFn) {
            if (_mouse.buttonDown) {
                this.backgroundTouchFn();
            }
        }
    }
}