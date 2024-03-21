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
    boidCountSlider.oninput = function() {
        doSetupActions(parseInt(boidCountSlider.value), parseFloat(cohereStrSlider.value), parseFloat(alignStrSlider.value), parseFloat(separateStrSlider.value), parseInt(cohereRadSlider.value), parseInt(alignRadSlider.value), parseInt(separateRadSlider.value), parseFloat(speedSlider.value), parseFloat(energySlider.value));
    }
    doSetupActions(parseInt(boidCountSlider.value), parseFloat(cohereStrSlider.value), parseFloat(alignStrSlider.value), parseFloat(separateStrSlider.value), parseInt(cohereRadSlider.value), parseInt(alignRadSlider.value), parseInt(separateRadSlider.value), parseFloat(speedSlider.value), parseFloat(energySlider.value));
}

function doSetupActions(boidCount, cohereStr, alignStr, sepStr, cohereRad, alignRad, sepRad, maxV, maxE) {
    boids = [];
    for (let i = 0; i < boidCount; i++) {
        boids.push(new Boid(alignStr, cohereStr, sepStr, alignRad, cohereRad, sepRad, maxE, maxV));
    }
}

function updateCohRad(newCohRad) {
    for (let boid of boids) {
        boid.cohesionRadius = parseInt(newCohRad);
    }
}

function updateAliRad(newAliRad) {
    for (let boid of boids) {
        boid.alignRadius = parseInt(newAliRad);
    }
}

function updateSepRad(newSepRad) {
    for (let boid of boids) {
        boid.separationRadius = parseInt(newSepRad);
    }
}

function updateSepStrength(newStrength) {
    for (let boid of boids) {
        boid.separationStrength = parseFloat(newStrength);
    }
}

function updateCohStrength(newStrength) {
    for (let boid of boids) {
        boid.cohesionStrength = parseFloat(newStrength);
    }
}

function updateAliStrength(newStrength) {
    for (let boid of boids) {
        boid.alignStrength = parseFloat(newStrength);
    }
}

function updateV(newV) {
    for (let boid of boids) {
        boid.maxSpeed = parseFloat(newV);
    }
}

function updateE(newE) {
    for (let boid of boids) {
        boid.maxEnergy = parseFloat(newE);
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
