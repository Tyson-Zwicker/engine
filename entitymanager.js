const EntityManager = function (entities) {
    this.entities = {};
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