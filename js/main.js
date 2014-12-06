var gameLoop;


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
		player.y -= 4;
		player.jumping--;
	} else if (!player.grounded()) {
		player.y += 4;
	}
	
	if (player.running) {
		player.x += player.running * 3;
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

Platform.prototype.draw = function() {
	ctx.strokeStyle = this.color.toString();
	ctx.beginPath();
	ctx.moveTo(this.left, this.y);
	ctx.lineTo(this.right, this.y);
	ctx.stroke();
}
