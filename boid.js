const maxEnergy = 0.2;
const maxSpeed = 5;

const AlignConstant = 1.5;
const CohesionConstant = 1;
const SeparationConstant = 2;

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
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
        this.acceleration.add(this.align(boids).mult(AlignConstant));
        this.acceleration.add(this.separate(boids).mult(SeparationConstant));
        this.acceleration.add(this.cohere(boids).mult(CohesionConstant));
    }

    align(boids) {
        let radius = 24;
        let alignmentVector = createVector();
        let neighbourCount = 0;

        for (let boid of boids) {
            let distance = p5.Vector.dist(boid.position, this.position);
            if (boid != this && distance < radius) {
                alignmentVector.add(boid.velocity);
                neighbourCount++;
            }
        }

        if (neighbourCount > 0) {
            //Find average of all velocities
            alignmentVector.div(neighbourCount);

            // Set magnitude to max speed
            alignmentVector.setMag(maxSpeed);
            alignmentVector.sub(this.velocity);
            alignmentVector.limit(maxEnergy);
        }

        return alignmentVector;
    }

    separate(boids) {
        let radius = 25;
        let separationVector = createVector();
        let neighbourCount = 0;

        for (let boid of boids) {
            let displacement = p5.Vector.sub(this.position, boid.position);
            if (boid != this && displacement.mag() < radius) {
                console.log(displacement);
                separationVector.add(displacement.div(displacement.mag() ** 2));
                neighbourCount++;
            }
        }

        if (neighbourCount > 0) {
            separationVector.div(neighbourCount);
            separationVector.setMag(maxSpeed);
            separationVector.sub(this.velocity);
            separationVector.limit(maxEnergy);
        }

        return separationVector;
    }

    cohere(boids) {
        let cohereRadius = 50;
        let cohesiveVector = createVector();
        let neighbourCount = 0;
        for (let boid of boids) {
            if (p5.Vector.dist(this.position, boid.position) < cohereRadius && this != boid) {
                cohesiveVector.add(boid.position);
                neighbourCount++;
            }
        }
        if (neighbourCount > 0) {

            cohesiveVector.div(neighbourCount);
            cohesiveVector.sub(this.position);
            cohesiveVector.setMag(maxSpeed);
            cohesiveVector.sub(this.velocity);
            cohesiveVector.limit(maxEnergy);
        }
        return cohesiveVector;
    }

    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(5);
        stroke(255, 255, 255);
        point(this.position.x, this.position.y);
    }
}