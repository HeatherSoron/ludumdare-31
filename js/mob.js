var mobs = [];

var mobSize = 20;

function Mob(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
}

Mob.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, mobSize, 0, Math.PI * 2);
	ctx.fill();
}
