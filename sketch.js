let boids = [];
const AlignConstant = 1.5;
const CohesionConstant = 1;
const SeparationConstant = 2;

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 20; i++) {
        boids.push(new Boid());
    }
}

function draw() {
    background(0);
    for (let boid of boids) {
        boid.wrap();
        boid.flock(boids);
        boid.move();
        boid.show();
    }
}
