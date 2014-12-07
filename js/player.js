var player = {x: 50, y: 50, width: 30, height: 30, color: 0};

var maxAttackRadius = 60;

player.getCenter = function() {
	return new Point(this.x + this.width/2, this.y + this.height/2);
}

player.sim = function() {
	if (this.jumping) {
		this.continueJump();
	} else if (!this.grounded()) {
		this.y += fallSpeed;
	}
	
	if (this.running) {
		this.x += this.running * 3;
	}
	
	if (this.x < 0) {
		this.x = 0;
	}
	if (this.x + this.width > canvas.width) {
		this.x = canvas.width - this.width;
	}
	
	if (this.attackBall) {
		if (this.attackBall.growing) {
			if (this.attackBall.radius < maxAttackRadius) {
				this.attackBall.radius += 4;
			} else {
				this.attackBall.growing = false;
			}
		} else {
			this.attackBall.radius -= 4;
			if (this.attackBall.radius < 0) {
				this.attackBall = undefined;
			}
		}
	}
}


player.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.getColor().toString();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fill();
	
	if (this.attackBall) {
		ctx.beginPath();
		ctx.fillStyle = this.attackBall.color.toString();
		ctx.arc(this.x + this.width/2, this.y + this.height/2, this.attackBall.radius, 0, Math.PI*2);
		ctx.fill();
	}
}

player.getColor = function() {
	return colors[this.color % colors.length];
}

// negative numbers don't work with % in JS, it seems
// so, MUST use a check for < 0
player.colorDown = function() {
	player.color--;
	while (player.color < 0) {
		player.color += colors.length;
	}
}

player.moveLeft = function() {
	this.x -= 1;
}
player.moveRight = function() {
	this.x += 1;
}

player.grounded = function() {
	for (var y in platforms) {
		if (y > this.y + this.height - (fallSpeed + 1) && y <= this.y + this.height) {
			for (var i in platforms[y]) {
				var platform = platforms[y][i];
				if (this.intersectsPlatform(platform)) {
					return true;
				}
			}
		}
	}
	return false;
}

player.intersectsPlatform = function(platform) {
	if (platform.right > this.x && platform.left < this.x + this.width) {
		if (this.getColor().interactsWith(platform.color)) {
			return true;
		}
	}
	return false;
}

player.continueJump = function() {
	var top = player.y - fallSpeed;
	// make sure we haven't hit a platform. If we have, abort.
	for (var y = player.y - fallSpeed; y <= player.y; y++) {
		if (platforms[y]) {
			for (var i in platforms[y]) {
				if (this.intersectsPlatform(platforms[y][i])) {
					this.jumping = 0;
					return false;
				}
			}
		}
	}
	
	player.y -= fallSpeed;
	player.jumping--;
	
	return true;
}

player.startJump = function() {
	if (player.grounded()) {
		playSfx("jump");
		player.jumping = 20;
	}
}

player.endJump = function() {
	player.jumping = 0;
}

// I tried placing the platform below the player, but it was exploitable
// so, platforms now spawn ABOVE the player
player.placePlatform = function(colorIndex) {
	// remember that colorIndex can be false-y! (0 is a valid value)
	if (colorIndex === undefined) {
		colorIndex = this.color;
	}
	
	var color = colors[colorIndex];
	
	var used = 10;
	var margin = 10;
	var spent = false;
	for (var key in this.power) {
		if (color[key[0]] && this.power[key][0] >= used + margin) {
			this.power[key][0] -= used;
			spent = true;
			break;
		}
	}
	
	// nope, player didn't have enough power to spawn a platform
	if (!spent) {
		playSfx("failure");
		return false;
	}
	
	var margin = this.width;
	new Platform(
		this.x - margin,
		this.x + this.width + margin,
		this.y - fallSpeed / 2, // the offset adds a neat visual effect due to physics granularity
		color
	);
	
	playSfx("create");
}

player.attack = function(colorIndex) {
	var minPower = 10;
	var powerUsed = 0.5;
	
	// remember that colorIndex can be false-y! (0 is a valid value)
	if (colorIndex === undefined) {
		color = new Color(0, 0, 0, 0.7, 'black');
		powerUsed = 5;
		var hasPower = false;
		for (var key in player.power) {
			if (player.power[key][0] > minPower) {
				hasPower = true;
			}
		}
		if (!hasPower) {
			return false;
		}
	} else {
		color = colors[colorIndex];
	}
	
	for (var key in player.power) {
		if (color.black || color[key[0]]) {
			current = player.power[key][0];
			player.power[key][0] = Math.max(minPower, current - powerUsed);
		}
	}
	
	this.attackBall = {
		growing: true,
		radius: 0,
		color: color,
	};
	
	playSfx("attack");
}

player.gainGoal = function(type) {
	this.goals.push(type);
	if (this.power[type]) {
		this.power[type][1] += 100;
	}
	playSfx("powerup");
}
