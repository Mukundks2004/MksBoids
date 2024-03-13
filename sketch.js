let boids;

function setup() {
    let container = createCanvas(600, 600);
    container.parent('container');

    

    let cohereStrSlider = document.getElementById("cohereStrength");
    cohereStrSlider.oninput = function() {updateCohStrength(cohereStrSlider.value);}

    let cohereRadSlider = document.getElementById("cohereRadius");
    cohereRadSlider.oninput = function() {updateCohRad(cohereRadSlider.value);}

    let alignStrSlider = document.getElementById("alignStrength");
    alignStrSlider.oninput = function() {updateAliStrength(alignStrSlider.value);}

    let alignRadSlider = document.getElementById("alignRadius");
    alignRadSlider.oninput = function() {updateAliRad(alignRadSlider.value);}

    let separateStrSlider = document.getElementById("separateStrength");
    separateStrSlider.oninput = function() {updateSepStrength(separateStrSlider.value);}

    let separateRadSlider = document.getElementById("separateRadius");
    separateRadSlider.oninput = function() {updateSepRad(separateRadSlider.value);}

    let speedSlider = document.getElementById("speedSlider");
    speedSlider.oninput = function() {updateV(speedSlider.value);}

    let energySlider = document.getElementById("energySlider");
    energySlider.oninput = function() {updateE(energySlider.value);}

    let boidCountSlider = document.getElementById("boidCountSlider");
    boidCountSlider.oninput = function() {doSetupActions(boidCountSlider.value, cohereStrSlider.value, alignStrSlider.value, separateStrSlider.value, cohereRadSlider.value, alignRadSlider.value, separateRadSlider.value, 5, 0.2);}

    doSetupActions(50, 1, 1.5, 2, 50, 25, 25, 5, 0.2);
}

function doSetupActions(boidCount, cohereStr, alignStr, sepStr, cohereRad, alignRad, sepRad, maxV, maxE) {
    boids = [];
    for (let i = 0; i < boidCount; i++) {
        boids.push(new Boid(alignStr, cohereStr, sepStr, alignRad, cohereRad, sepRad, maxE, maxV));
    }
}

function updateCohRad(newCohRad) {
    for (let boid of boids) {
        boid.cohesionRadius = newCohRad;
    }
}

function updateAliRad(newAliRad) {
    for (let boid of boids) {
        boid.alignRadius = newAliRad;
    }
}

function updateSepRad(newSepRad) {
    for (let boid of boids) {
        boid.separationRadius = newSepRad;
    }
}

function updateSepStrength(newStrength) {
    for (let boid of boids) {
        boid.separationStrength = parseInt(newStrength);
    }
}

function updateCohStrength(newStrength) {
    for (let boid of boids) {
        boid.cohesionStrength = parseInt(newStrength);
    }
}

function updateAliStrength(newStrength) {
    for (let boid of boids) {
        boid.alignStrength = parseInt(newStrength);
    }
}

function updateV(newV) {
    for (let boid of boids) {
        boid.maxSpeed = parseInt(newV);
    }
}

function updateE(newE) {
    for (let boid of boids) {
        boid.maxEnergy = parseInt(newE);
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
