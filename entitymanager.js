const EntityManager = function (entities) {
    this.entities = {};
    if (entities) {
        entities.forEach(entity => {
            this.entities[entity.name]= entity;
        });
    }
}
EntityManager.prototype.manage = function () {
    Object.getOwnPropertyNames(this.entities).forEach (entityName=>{
        let entity = this.entities[entityName];
        entity.move();
        entity.draw();

        //Think...
    });
}
//These methods mostly exist to gate-keep the map to ease in future, inevitable, debugging
EntityManager.prototype.add = function (entity) {
    if (!this.entities.has(entity.name)) {
        this.entities.set(entity.name, entity);
    }
}
EntityManager.prototype.remove = function (entityName) {
    this.entities.delete(entityName);
}
EntityManager.prototype.get = function (entityName) {
    this.entities.get(entityName);
}
EntityManager.prototype.has = function (entityName){
    return this.entities.has (entityName);
}