class Ship {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.heading = 0;
		this.rotation = 0;
		this.r = 20;
		this.velocity = createVector(0, -1);
		this.isBoosting = false;
	}

	render() {
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading + PI / 2);
		fill(0);
		stroke(255);
		triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
		pop();
	}

	setRotation(a) {
		this.rotation = a;
	}

	turn() {
		this.heading += this.rotation;
	}

	update() {
		if (this.isBoosting) {
			this.boost();
		}
		this.pos.add(this.velocity);
		this.velocity.mult(0.99);
	}

	boost() {
		var force = p5.Vector.fromAngle(this.heading);
		force.mult(0.2);
		this.velocity.add(force);
		push();
		// translate(ship.pos.x, ship.pos.y);
		fill("red");
		stroke("yellow");
		strokeWeight(5);
		point(ship.pos.x/PI, ship.pos.y/PI);
		pop();
	}

	boosting(b) {
		this.isBoosting = b;
	}

	hits(asteroid) {
		let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
		if (d < this.r + asteroid.r) {
			return true;
		}
	}
}
