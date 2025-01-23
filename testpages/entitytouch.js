const engine = new Engine();
//name,sprite, offset, orientation
let fwdturret = new Part('fwdturret', turret, new Point(0, -100), 0);
let aftturret = new Part('aftturret', turret, new Point(0, 100), rad(180));
const buttonColors = new ButtonColors ('#700', '#aa0','#00f', '#0ff');
engine.addButton('testbutton1', 'add ent#2', 0, 180, 150, 210, 1.3, buttonColors, () => {
    engine.addEntity("entity2", [hull, superstructure], new Point(400, 0), 0, new Point(0, 0), 0, 10, 200, []);
});
engine.addButton('testbutton2', 'rmv ent#2', 0, 220, 150, 250, 1.3, buttonColors, () => {
    engine.removeEntity('entity2');
});
engine.addButton('testbutton3', 'add prt to ent2', 0, 260, 150, 290, 1.3, buttonColors, () => {
    engine.addEntityPart('entity2', aftturret);
});
engine.addButton('testbutton4', 'rem prt frm ent2', 0, 300, 150, 330, 1.3, buttonColors, () => {
    engine.removeEntityPart('entity2', 'aftturret');
});

engine.addTattler('1em monospace', 10, 300);
//name, sprites, position, angle, velocity, spin, mass, radius, parts
engine.addEntity(
    "entity1", [hull, superstructure], new Point(0, 0), 0, new Point(0, 0), 0, 10, 200, [fwdturret, aftturret]
);
engine.setEntityTouchEvent((entityName) => {
    if (entityName) {
        engine.tellTattleGrouped('touched', entityName, '#9ff');
    }
});
engine.setBackgroundTouchEvent(() => {
    engine.tellTattleGrouped('bground', `${_mouse.move.where.x},${_mouse.move.where.y}`, '#aaa');
});
