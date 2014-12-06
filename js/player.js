var player = {x: 50, y: 50, width: 30, height: 30, color: 0};

player.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.getColor().toString();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fill();
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
	
	var margin = this.width;
	new Platform(
		this.x - margin,
		this.x + this.width + margin,
		this.y - fallSpeed / 2, // the offset adds a neat visual effect due to physics granularity
		colors[colorIndex]
	);
}
