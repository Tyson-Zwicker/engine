const Particle = function (position, velocity, lifespan, rgb) {
    this.position = position;
    this.velocity = velocity;
    this.lifespan = lifespan;
    this.originalLifespan = lifespan;
    this.red = rgb.r;
    this.green = rgb.g;
    this.blue = rgb.b;
    this.manager = null;
}
Particle.prototype.move = function () {    
    this.orientation = this.spin * _delta;
    this.position = this.position.add(this.velocity.mult(_delta));
    this.lifespan -= (_delta * 1000);
}
Particle.prototype.draw = function () {
    let x = (this.position.x - _camera.x) * _zoom + _centerOfScreen.x;
    let y = (this.position.y - _camera.y) * _zoom + _centerOfScreen.y;
    let lifePercent = this.lifespan / this.originalLifespan;
    let r = this.red * lifePercent;
    let g = this.green * lifePercent;
    let b = this.blue * lifePercent;
    let hexColor = rgbToHex(r, g, b);
    drawPixel(x, y, hexColor);
}
const ParticleManager = function () {
    this.particles = [];
}

ParticleManager.prototype.addBurst = function (position, quantity, rgb, lifeMinMax, arc, magnitude) {
    for (let i = 0; i < quantity; i++) {
        let a = rnd(arc.start, arc.end);
        let l = magnitude / 2 + rnd(0, magnitude / 2);
        let velocity = new Point(cos(a) * l, sin(a) * l);
        let particle = new Particle(position, velocity, rnd(lifeMinMax.min, lifeMinMax.max), rgb);
        this.particles.push(particle);
    }
}
ParticleManager.prototype.manage = function () {
    let alive = [];
    this.particles.forEach(particle => {
        particle.draw();
        particle.move();
        if (particle.lifespan > 0) {            
            alive.push(particle);
        }
    });
    this.particles = alive;
}