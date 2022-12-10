var ship;
var asteroids = [];
var lasers = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	ship = new Ship();
	for (let i = 0; i < 10; ++i) {
		asteroids.push(new Asteroid());
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);

	for (let i = 0; i < asteroids.length; ++i) {
		if (ship.hits(asteroids[i])) {
			console.log("OUT");
		}
		asteroids[i].render();
		asteroids[i].update();
		checkEdges(asteroids[i]);
	}

	for (let i = lasers.length - 1; i >= 0; --i) {
		lasers[i].render();
		lasers[i].update();
		if (lasers[i].offscreen()) {
			lasers.splice(i, 1);
		} else {
			for (let j = asteroids.length - 1; j >= 0; --j) {
				if (lasers[i].hits(asteroids[j])) {
					if (asteroids[j].r > 20) {
						let newAsteroids = asteroids[j].breakUp();
						asteroids.push(...newAsteroids);
					}
					asteroids.splice(j, 1);
					lasers.splice(i, 1);
					break;
				}
			}
		}
	}

	ship.render();
	ship.turn();
	ship.update();
	checkEdges(ship);
}

function keyReleased() {
	ship.setRotation(0);
	ship.boosting(false);
}

function keyPressed() {
	if (key == " ") {
		lasers.push(new Laser(ship.pos, ship.heading));
	}
	if (keyCode == RIGHT_ARROW) {
		ship.setRotation(0.1);
	} else if (keyCode == LEFT_ARROW) {
		ship.setRotation(-0.1);
	} else if (keyCode == UP_ARROW) {
		ship.boosting(true);
	}
}

function checkEdges(obj) {
	if (obj.pos.x > width + obj.r) {
		obj.pos.x = -obj.r;
	} else if (obj.pos.x < -obj.r) {
		obj.pos.x = width + obj.r;
	}
	if (obj.pos.y > height + obj.r) {
		obj.pos.y = -obj.r;
	} else if (obj.pos.y < -obj.r) {
		obj.pos.y = height + obj.r;
	}
}

/**
let r = 170;
let angle = 45;
let vel = 0;
let acc = 0.001;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {
	translate(width / 2, height / 2);
	background(0);
	let x = r * cos(angle);
	let y = r * sin(angle);
	// stroke(random(255), random(255), random(255));
	stroke(255);
	noFill();
	line(0, 0, x, y);
	ellipse(x, y, 70, 70);

	// r += 2;
	angle += vel;
	vel += acc;

	// if (x + 50 > width || y + 50 > height) {
	// 	noLoop();
	// }
}
 */
