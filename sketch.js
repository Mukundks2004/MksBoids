let boids = [];

function setup() {
    createCanvas(600, 600);
    for (let i = 0; i < 120; i++) {
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
