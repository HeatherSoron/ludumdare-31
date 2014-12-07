var platforms = [
];

function Platform(left, right, y, color) {
	this.left = left;
	this.right = right;
	this.y = y;
	this.color = color;
	
	// register the platform in the global list
	if (!platforms[y]) {
		platforms[y] = [];
	}
	
	platforms[y].push(this);
	console.log("Placing platform", this);
}

Platform.prototype.trySpawn = function() {
	if ((Math.random() * 1000) < 1) {
		var width = (this.right - mobSize) - this.left;
		if (width < 0) {
			width = 0;
		}
		mobs.push(new Mob(this.left + Math.random() * width, this.y - mobSize, this.color));
	}
}

Platform.prototype.draw = function() {
	ctx.strokeStyle = this.color.toString();
	ctx.beginPath();
	ctx.moveTo(this.left, this.y);
	ctx.lineTo(this.right, this.y);
	ctx.stroke();
}
