var mobs = [];

var mobSize = 40;

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
