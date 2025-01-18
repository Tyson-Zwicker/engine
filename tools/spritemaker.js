const lines = []
const engine = new Engine();       
const spriteMaker = function (){
        console.log (`Engine: ${engine}`);
}

/*
 engine.addButton('testbutton1', 'add ent#2', 0, 180, 150, 210, 1.3, '#fff', '#600', '#007', '#fff', () => {
            
});
  
    engine.addTattler('1em monospace', 10, 300);
    //name, sprites, position, angle, velocity, spin, mass, radius, parts
    engine.setEntityTouchEvent((entityName) => {
        if (entityName) {
            engine.tellTattleGrouped('touched', entityName, '#9ff');
        }
    });
    engine.setBackgroundTouchEvent (()=>{
        engine.tellTattleGrouped ('bground',`${_mouse.move.where.x},${_mouse.move.where.y}`,'#aaa');
    });
*/