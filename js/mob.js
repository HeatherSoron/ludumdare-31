var mobs = [];

var mobSize = 40;
var mobSpeed = 2;

function Mob(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	if (Math.random() * 2 < 1) {
		this.left = true;
	}
}

Mob.prototype.draw = function() {
	ctx.beginPath();
	if (this.left) {
		ctx.moveTo(this.x + mobSize, this.y);
		ctx.lineTo(this.x + mobSize, this.y + mobSize);
		ctx.lineTo(this.x, this. y + mobSize / 2);
		ctx.lineTo(this.x + mobSize, this.y);
	} else {
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x, this.y + mobSize);
		ctx.lineTo(this.x + mobSize, this. y + mobSize / 2);
		ctx.lineTo(this.x, this.y);
	}
	ctx.fillStyle = this.color;
	ctx.fill();
}

Mob.prototype.sim = function() {
	if (this.sufferAttack()) {
		console.log("Stopping mob sim");
		return false;
	}
	
	// move towards the player, and flip around if you've passed the player
	if (this.left) {
		if (this.x + mobSize > player.x) {
			this.x -= mobSpeed;
		} else {
			this.left = false;
		}
	} else {
		if (this.x < player.x + player.width) {
			this.x += mobSpeed;
		} else {
			this.left = true;
		}
	}
	
	if (!this.grounded()) {
		this.y += fallSpeed;
	}
	
	this.attackPlayer();
	
	return true;
}

Mob.prototype.sufferAttack = function() {
	if (player.attackBall) {
		var pcenter = player.getCenter();
		var rad = player.attackBall.radius;
		// had to look up the geometry for this circle and rectangle thing- http://stackoverflow.com/a/1879223
		var nearX = Math.max(this.x, Math.min(pcenter.x, this.x + mobSize));
		var nearY = Math.max(this.y, Math.min(pcenter.y, this.y + mobSize));
		if (pcenter.dist(new Point(nearX, nearY)) <= rad) {
			if (this.color.interactsWith(player.attackBall.color)) {
				return true;
			}
		}
	}
	return false;
}

Mob.prototype.attackPlayer = function() {
	if (this.x < player.x + player.width && this.x + mobSize > player.x && this.y < player.y + player.height && this.y + mobSize > player.y) {
		if (this.color.interactsWith(player.getColor())) {
			lost = true;
			clearInterval(gameLoop);
		}
	}
}

Mob.prototype.grounded = function() {
	for (var y in platforms) {
		if (y > this.y + mobSize - (fallSpeed + 1) && y <= this.y + mobSize) {
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

Mob.prototype.intersectsPlatform = function(platform) {
	if (platform.right > this.x && platform.left < this.x + mobSize) {
		if (this.color.interactsWith(platform.color)) {
			return true;
		}
	}
	return false;
}
