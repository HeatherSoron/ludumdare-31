var gameLoop;

var fallSpeed = 4;


function init() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 4;
	
	registerListeners();
	
	new Platform(0, canvas.width, canvas.height, new Color(0,0,0,1));
	player.y = canvas.height - player.height * 2;
	
	gameLoop = setInterval(runGame, 25);
}

function runGame() {
	player.sim();
	
	var deadMobs = [];
	for (var i = 0; i < mobs.length; ++i) {
		if (!mobs[i].sim()) {
			deadMobs.push(i);
		}
	}
	
	for (var i = deadMobs.length - 1; i >= 0; i--) {
		mobs.splice(deadMobs[i], 1);
	}
	
	for (var y in platforms) {
		for (var j = 0; j < platforms[y].length; ++j) {
			platform = platforms[y][j];
			platform.trySpawn();
		}
	}
	
	render();
}


function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.dist = function(other) {
	return Math.sqrt(this.distSqr(other));
}

Point.prototype.distSqr = function(other) {
	return Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2);
}
