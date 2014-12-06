var gameLoop;

var fallSpeed = 4;

var platforms = [
];


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
	if (player.jumping) {
		player.continueJump();
	} else if (!player.grounded()) {
		player.y += fallSpeed;
	}
	
	if (player.running) {
		player.x += player.running * 3;
	}
	
	for (var y in platforms) {
		for (var j = 0; j < platforms[y].length; ++j) {
			platform = platforms[y][j];
			platform.trySpawn();
		}
	}
	
	render();
}


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
	if ((Math.random() * 500) < 1) {
		var width = this.right - this.left;
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
