// this is where you use the tools to make your program
   
const sprite1 = new Sprite([
    new SpriteLine(0, -150, 100, 100, '#ff0', 3),
    new SpriteLine(100, 100, -100, 100, '#ff0', 3),
    new SpriteLine(-100, 100, 0, -150, '#ff0', 3)
]);
const sprite2 = new Sprite([
    new SpriteLine(0, -90, 70, 70, '#f00', 2),
    new SpriteLine(70, 70, -70, 70, '#0ff', 2),
    new SpriteLine(-70, 70, 0, -90, '#0f0', 2)
]);
//name, sprites, position, angle, velocity, spin, mass
const entity1 = new Entity(
    'Entity 1',
    [sprite1, sprite2],
    new Point(1500, 2500),
    rad(45),
    new Point(-50, -50),
    0, 100, 150
);
const entity2 = new Entity(
    'Entity 2',
    [sprite1, sprite2],
    new Point(-1600, -3100),
    rad(90),
    new Point(20, 20),
    rad(10), 100, 150
);
const entity3 = new Entity(
    'Entity 3',
    [sprite1, sprite2],
    new Point(0, 0),
    rad(0),
    new Point(0, 0),
    rad(10), 100, 150
);
const redLabel = new EntityLabel(.66, '#F00');
const greenLabel = new EntityLabel(.66, '#0F0');
let labelContents = [
    { name: 'name', label: '' },
    { name: 'position', label: 'P:' },
    { name: 'velocity', label: 'V:' }
];
let labelContents2 = [
    { name: 'name', label: '' },
    { name: 'position', label: 'P:' },
    { name: 'velocity', label: 'V:' },
    { name: 'angle', label: 'H:' }
]
entity1.assignLabel(redLabel.clone(), labelContents);
entity2.assignLabel(redLabel.clone(), labelContents);
entity3.assignLabel(greenLabel.clone(), labelContents2);

 /* These are the functions that the buttons call when clicked*/
 function showEntity1 (){
    _camera.x = entity1.position.x;
    _camera.y = entity1.position.y;
}
function showEntity2 (){
    _camera.x = entity2.position.x;
    _camera.y = entity2.position.y;
}
function showEntity3 (){
    _camera.x = entity3.position.x;
    _camera.y = entity3.position.y;
}
/*And these are the buttons that so those^^ functions*/
const button1 = new Button(
    'button1',
    'Show 1',
    30, 40, 180, 70,
     1.1,
    '#700', '#aa0',
    '#00f', '#0ff',
    showEntity1
);
const button2 = new Button(
    'button2',
    'Show 2',
    30, 75, 180, 105,
     1.1,
    '#700', '#aa0',
    '#00f', '#0ff',
    showEntity2
);
const button3 = new Button(
    'button3',
    'Show 3',
    30, 110, 180, 140,
     1.1,
    '#700', '#aa0',
    '#00f', '#0ff',
    showEntity3
);
const buttonManager = new ButtonManager ([button1, button2, button3]);
