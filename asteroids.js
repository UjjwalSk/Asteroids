class Asteroid {
	constructor(
		pos = createVector(random(width), random(height)),
		r = random(40, 60) * 2
	) {
		this.pos = pos.copy();
		this.total = floor(random(5, 15));
		this.velocity = p5.Vector.random2D();
		this.r = r * 0.5;
		this.offset = [];
		for (let i = 0; i < this.total; ++i) {
			this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
		}
	}

	render() {
		push();
		stroke(255);
		noFill();
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (let i = 0; i < this.total; ++i) {
			let angle = map(i, 0, this.total, 0, TWO_PI);
			let r = this.r + this.offset[i];
			vertex(r * cos(angle), r * sin(angle));
		}
		endShape(CLOSE);
		pop();
	}

	update() {
		this.pos.add(this.velocity);
	}

	breakUp() {
		var newA = [];
		newA.push(new Asteroid(this.pos, this.r));
		newA.push(new Asteroid(this.pos, this.r));
		return newA;
	}
}
