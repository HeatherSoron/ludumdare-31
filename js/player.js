var player = {x: 50, y: 50, width: 30, height: 30, color: 0};

player.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = colors[this.color % colors.length].toString();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fill();
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
		if (y > this.y && y <= this.y + this.height) {
			for (var i in platforms[y]) {
				var platform = platforms[y][i];
				if (platform.right > this.x && platform.left < this.x + this.width) {
					return true;
				}
			}
		}
	}
	return false;
}
