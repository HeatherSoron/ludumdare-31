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
