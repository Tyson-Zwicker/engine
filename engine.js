
const Engine = function (){
    let buttonManager = new ButtonManager ();
    let entityManager = new EntityManager ();
    //tattler..
    //particle engine..
}
//
Engine.prototype.addButton = function (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action){
    ButtonManager.addButton (new Button (name, text, x0, y0, x1, y1, fontsize, color, bgColor, hColor, hbgColor, action));
}
//add a clean-out so  buttons can be reset..
Engine.prototype.addEntity = function (name, sprites, position, angle, velocity, spin, mass, radius){
    EntityManager.addEntity (new Entity (name, sprites, position, angle, velocity, spin, mass, radius));
}
//add remove entity by name..
//also remove all entries.
//add tattle methods to hide the Tale part- just take the parameters and do that in here..
//particle generator methods.

//Then a big 'ol do() method that makes every move, draw, tell, sparkle, whatever..
