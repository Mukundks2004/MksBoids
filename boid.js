const AlignConstant = 1.5;
const CohesionConstant = 1;
const SeparationConstant = 2;

class Boid {
    constructor(alignStrength, cohesionStrength, separationStrength, alignRadius, cohesionRadius, separationRadius, maxEnergy, maxSpeed) {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.color = this.varyColour(color("orange"));
        this.alignStrength = alignStrength;
        this.cohesionStrength = cohesionStrength;
        this.separationStrength = separationStrength;
        this.alignRadius = alignRadius;
        this.cohesionRadius = cohesionRadius;
        this.separationRadius = separationRadius;
        this.maxEnergy = maxEnergy;
        this.maxSpeed = maxSpeed;
    }

    varyColour(baseColour) {
        let sat = floor(saturation(baseColour)) + random(0, 0);
        let light = floor(lightness(baseColour)) + random(-40, +20);
        return `hsl(${floor(hue(baseColour))}, ${sat}%, ${light}%)`
    }

    wrap() {
        if (this.position.x > width) {
            this.position.x = 0;
        }
        if (this.position.x < 0) {
            this.position.x = width
        }
        if (this.position.y > height) {
            this.position.y = 0;
        }
        if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    flock(boids) {
        this.acceleration.add(this.align(boids).mult(this.alignStrength));
        this.acceleration.add(this.separate(boids).mult(this.separationStrength));
        this.acceleration.add(this.cohere(boids).mult(this.cohesionStrength));
    }

    cohere(boids) {
        let cohesiveVector = createVector();
        let neighbourCount = 0;
        for (let boid of boids) {
            if (p5.Vector.dist(this.position, boid.position) < this.cohesionRadius && this != boid) {
                cohesiveVector.add(boid.position);
                neighbourCount++;
            }
        }
        if (neighbourCount > 0) {
            cohesiveVector.div(neighbourCount);
            cohesiveVector.sub(this.position);
            cohesiveVector.setMag(this.maxSpeed);
            cohesiveVector.sub(this.velocity);
            cohesiveVector.limit(this.maxEnergy);
        }
        return cohesiveVector;
    }

    align(boids) {
        let alignmentVector = createVector();
        let neighbourCount = 0;

        for (let boid of boids) {
            let distance = p5.Vector.dist(boid.position, this.position);
            if (boid != this && distance < this.alignRadius) {
                alignmentVector.add(boid.velocity);
                neighbourCount++;
            }
        }

        if (neighbourCount > 0) {
            alignmentVector.div(neighbourCount);
            alignmentVector.setMag(this.maxSpeed);
            alignmentVector.sub(this.velocity);
            alignmentVector.limit(this.maxEnergy);
        }

        return alignmentVector;
    }

    separate(boids) {
        let separationVector = createVector();
        let neighbourCount = 0;

        for (let boid of boids) {
            let displacement = p5.Vector.sub(this.position, boid.position);
            if (boid != this && displacement.mag() < this.separationRadius) {
                separationVector.add(displacement.div(displacement.mag() ** 2));
                neighbourCount++;
            }
        }

        if (neighbourCount > 0) {
            separationVector.div(neighbourCount);
            separationVector.setMag(this.maxSpeed);
            separationVector.sub(this.velocity);
            separationVector.limit(this.maxEnergy);
        }

        return separationVector;
    }

    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        colorMode(HSB);
        strokeWeight(5);
        stroke(this.color);
        point(this.position.x, this.position.y);
    }
}