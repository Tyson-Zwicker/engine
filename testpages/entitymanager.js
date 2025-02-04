// this is where you use the tools to make your program
//name, sprites, position, angle, velocity, spin, mass
const entity1 = new Entity(
    'Entity 1',
    [hull, superstructure],
    new Point(1500, 2500),
    rad(45),
    new Point(-50, -50),
    0, 100, 150
);
const entity2 = new Entity(
    'Entity 2',
    [hull],
    new Point(-1600, -3100),
    rad(90),
    new Point(20, 20),
    rad(10), 100, 150
);
const entity3 = new Entity(
    'Entity 3',
    [hull, turret],
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
const entityManager = new EntityManager([entity1, entity2, entity3]);