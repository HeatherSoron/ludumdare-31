var canvas;
var ctx;
var gameLoop;

var alpha = 1.0 / 3.0;

var colors = [
	new Color(255, 0, 0, alpha),
	new Color(0, 255, 0, alpha),
	new Color(0, 0, 255, alpha),
];

var keys = {
	'a': 65,
	'd': 68,
	's': 83,
	
	'up': 38,
	'down': 40,
}

var player = {x: 50, y: 50, width: 30, height: 30, color: 0};
player.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = colors[this.color % colors.length].toString();
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fill();
}

function init() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	
	registerListeners();
	
	gameLoop = setInterval(runGame, 25);
}

function runGame() {
	player.draw();
}

function registerListeners() {
	document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
	console.log(e);
	document.getElementById("keycode").innerHTML = e.keyCode;
	
	switch (e.keyCode) {
		case keys.up:
			player.color++;
			e.preventDefault();
			break;
		case keys.down:
			player.color--;
			e.preventDefault();
			break;
	}
}


function drawTestShapes() {	
	// draw some test shapes
	ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
	ctx.beginPath()
	ctx.rect(40, 40, 60, 30);
	ctx.fill();
	
	ctx.fillStyle = "rgba(0, 255, 0, " + alpha + ")";
	ctx.beginPath()
	ctx.rect(60, 40, 60, 30);
	ctx.fill();
	
	ctx.fillStyle = "rgba(0, 0, 255, " + alpha + ")";
	ctx.beginPath()
	ctx.rect(50, 50, 60, 30);
	ctx.fill();
}


function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.prototype.toString = function() {
	return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
}
