
const engine = new Engine();

//name,sprite, offset, orientation
let fwdturret = new Part('fwdturret', turret, new Point(0, -100), 0);
let aftturret = new Part('aftturret', turret, new Point(0, 100), rad(180));
engine.addButton('testbutton1', 'add ent#2', 0, 180, 150, 210, 1.3, '#fff', '#600', '#007', '#fff', () => {
    engine.addEntity("entity2", [hull, superstructure], new Point(400, 0), 0, new Point(0, 0), 0, 10, 200, []);
});
engine.addButton('testbutton2', 'rmv ent#2', 0, 220, 150, 250, 1.3, '#fff', '#600', '#007', '#fff', () => {
    engine.removeEntity('entity2');
});
engine.addButton('testbutton3', 'add prt to ent2', 0, 260, 150, 290, 1.3, '#fff', '#600', '#007', '#fff', () => {
    engine.addEntityPart('entity2', aftturret);
});
engine.addButton('testbutton4', 'rem prt frm ent2', 0, 300, 150, 330, 1.3, '#fff', '#600', '#007', '#fff', () => {
    engine.removeEntityPart('entity2', 'aftturret');
});
engine.addTattler('1em monospace', 10, 300);
//name, sprites, position, angle, velocity, spin, mass, radius, parts
engine.addEntity(
    "entity1", [hull, superstructure], new Point(0, 0), 0, new Point(0, 0), 0, 10, 200, [fwdturret, aftturret]
);