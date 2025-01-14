
const Engine = function (){
    let buttonManager = new ButtonManager ();
    let entityManager = new EntityManager ();
    
}
//
Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action){
    ButtonManager.addButton (new Button (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action));
}

Engine.prototype.addEntity = function (name, sprites, position, angle, velocity, spin, mass, radius){
    EntityManager.addEntity (new Entity (name, sprites, position, angle, velocity, spin, mass, radius));
}
