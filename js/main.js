var gameLoop;

var fallSpeed = 4;

var lost = false;
var won = false;

function init() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 4;
	
	loadAudio();
	
	registerListeners();
	
	new Platform(0, canvas.width, canvas.height, new Color(0,0,0,1));
	player.y = canvas.height - player.height * 2;
	
	player.goals = [];
	
	player.previousColors = [];
	
	player.power = {
		'red': [50, 100],
		'green': [50, 100],
		'blue': [50, 100],
	}
	
	makeGoalStars();
	
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
	
	
	var grabbedItems = [];
	for (var i = 0; i < items.length; ++i) {
		if (items[i].touchedByPlayer()) {
			if (items[i].goalType) {
				player.gainGoal(items[i].goalType);
			}
			grabbedItems.push(i);
		}
	}
	for (var i = grabbedItems.length - 1; i >= 0; --i) {
		items.splice(grabbedItems[i], 1);
	}
	
	if (player.goals.length == 3) {
		win();
	}
	
	render();
}

function win() {
	won = true;
	clearInterval(gameLoop);
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

// create new point by offseting by x units, in a particular direction
Point.prototype.offsetByRadius= function(rad, angle) {
	return new Point(this.x + rad * Math.cos(angle), this.y + rad * Math.sin(angle));
}
