
const hull = new Sprite([
    new SpriteLine(0, -200, 30, -150, '#ccc', 2),
    new SpriteLine(30, -150, 45, -100, '#ccc', 2),
    new SpriteLine(45, -100, 52, -50, '#ccc', 2),
    new SpriteLine(52, -50, 52, 50, '#ccc', 2),
    new SpriteLine(52, 50, 45, 100, '#ccc', 2),
    new SpriteLine(45, 100, 30, 150, '#ccc', 2),
    new SpriteLine(30, 150, 0, 200, '#ccc', 2),
    new SpriteLine(0, 200, -30, 150, '#ccc', 2),
    new SpriteLine(-30, 150, -45, 100, '#ccc', 2),
    new SpriteLine(-45, 100, -52, 50, '#ccc', 2),
    new SpriteLine(-52, 50, -52, -50, '#ccc', 2),
    new SpriteLine(-52, -50, -45, -100, '#ccc', 2),
    new SpriteLine(-45, -100, -30, -150, '#ccc', 2),
    new SpriteLine(-30, -150, 0, -200, '#ccc', 2)
]);
const superstructure = new Sprite([
    new SpriteLine(-40, -45, 40, -45, '#fff', 2),
    new SpriteLine(40, -45, 40, -30, '#fff', 2),
    new SpriteLine(40, -30, 20, -30, '#fff', 2),
    new SpriteLine(20, -30, 20, 0, '#fff', 2),
    new SpriteLine(20, 0, -20, 0, '#fff', 2),
    new SpriteLine(-20, 0, -20, -30, '#fff', 2),
    new SpriteLine(-20, -30, -40, -30, '#fff', 2),
    new SpriteLine(-40, -30, -40, -45, '#fff', 2)
]);
const turret = new Sprite([
    new SpriteLine(-10, -20, -20, -10, '#fff', 2),
    new SpriteLine(-20, -10, -20, 10, '#fff', 2),
    new SpriteLine(-20, 10, -10, 20, '#fff', 2),
    new SpriteLine(-10, 20, 10, 20, '#fff', 2),
    new SpriteLine(10, 20, 20, 10, '#f0f', 2),
    new SpriteLine(20, 10, 20, -10, '#ff0', 2),
    new SpriteLine(20, -10, 10, -20, '#0ff', 2),
    new SpriteLine(10, -20, -10, -20, '#f0f', 2),

    new SpriteLine(-12, -12, -12, 12, '#fff', 2),
    new SpriteLine(-12, 12, 12, 12, '#fff', 2),
    new SpriteLine(12, 12, 12, -12, '#fff', 2),
    new SpriteLine(12, -12, -12, -12, '#fff', 2),

    new SpriteLine(-3, -12, -3, -38, '#fff', 2),
    new SpriteLine(-3, -38, 3, -38, '#fff', 2),
    new SpriteLine(3, -38,  3, -12, '#fff', 2),
    new SpriteLine(3, -12, -3, -12, '#fff', 2)
]);