const maxEnergy = 0.2;
const maxSpeed = 5;
const radius = 30;

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(3);
        this.acceleration = createVector();
    }

    flock(boids) {
        this.acceleration.add(this.align(boids) * AlignConstant, this.separate(boids) * SeparationConstant, this.cohere(boids) * CohesionConstant);
    }

    align(boids) {
        let newVelocity = createVector();
        let neighbourCount = 0;
        for (let boid of boids) {
            let distance = p5.Vector.dist(boid.position, this.position);
            if (boid != this && distance < radius) {
                newVelocity += boid.velocity;
                neighbourCount++;
            }
        }
        if (neighbourCount > 0) {
            // newVelocity = p5Min.Vector.div(neighbourCount);
            //newVelocity.div(neighbourCount);
            //newVelocity.setMag(maxSpeed);
            //newVelocity.sub(this.velocity);
            //newVelocity.limit(maxSpeed);
        }
        return newVelocity;
    }

    separate(boids) {
        return createVector();
    }

    cohere(boids) {
        return createVector();
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

    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        strokeWeight(10);
        stroke(0, 0, 255);
        point(this.position.x, this.position.y);
    }
}