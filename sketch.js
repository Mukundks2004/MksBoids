let boids;

function setup() {
    var container = createCanvas(600, 600);
    container.parent('container');
    let slider = document.getElementById("boidCountSlider");
    slider.oninput = function() {
        doSetupActions(slider.value);
    }
    doSetupActions(50);
}

function doSetupActions(boidCount) {
    boids = [];
    for (let i = 0; i < boidCount; i++) {
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
