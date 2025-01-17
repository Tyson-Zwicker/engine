const EntityManager = function (entities, touchedFn) {
    this.entities = {};
    this.touchedName = null;
    this.touchedFn = touchedFn;
    if (entities) {
        entities.forEach(entity => {
            this.entities[entity.name] = entity;
        });
    }

}
EntityManager.prototype.manage = function () {
    Object.getOwnPropertyNames(this.entities).forEach(entityName => {
        let entity = this.entities[entityName];
        entity.move();
        entity.draw();

        //Think...
    });
}
//These methods mostly exist to gate-keep the map to ease in future, inevitable, debugging
EntityManager.prototype.add = function (entity) {
    if (!this.entities.hasOwnProperty(entity.name)) {
        this.entities[entity.name] = entity;
    }
}
EntityManager.prototype.remove = function (entityName) {
    delete this.entities[entityName];
}
EntityManager.prototype.get = function (entityName) {
    return this.entities[entityName];
}
EntityManager.prototype.has = function (entityName) {
    return this.entities.hasOwnProperty(entityName);
}
EntityManager.prototype.checkTouch = function () {
    this.touchedName = null;
    this.entities.forEach(entity => {
        if (touchedName === null) { //break out the heavy stuff once you find one.
            let location = entity.getWindowLocation();
            let radius = entity.radius / _zoom;
            let bounds = { x0: location.x - radius, y0: location.y - radius, x1: location.x + radius, y1: location.y + radius };
            if (_mouse.buttonDown) {
                if (bounded(_mouse.move.down.where, bounds)) {
                    this.touchedName = entity.Name;
                    this.touchedFn (touchedName);
                }
            }
        }
    });
    return touchedName;
}