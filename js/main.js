var canvas;
var ctx;
var gameLoop;

var alpha = 1.0 / 3.0;

var colors = [
	new Color(255, 0, 0, alpha),
	new Color(0, 255, 0, alpha),
	new Color(0, 0, 255, alpha),
];

var platforms = [
];

var keys = {
	'a': 65,
	'd': 68,
	's': 83,
	
	
	'left': 37,
	'right': 39,
	
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

// negative numbers don't work with % in JS, it seems
// so, MUST use a check for < 0
player.colorDown = function() {
	player.color--;
	while (player.color < 0) {
		player.color += colors.length;
	}
}

player.moveLeft = function() {
	this.x -= 1;
}
player.moveRight = function() {
	this.x += 1;
}

player.grounded = function() {
	for (var y in platforms) {
		if (y > this.y && y <= this.y + this.height) {
			for (var i in platforms[y]) {
				var platform = platforms[y][i];
				if (platform.right > this.x && platform.left < this.x + this.width) {
					return true;
				}
			}
		}
	}
	return false;
}

function init() {
	canvas = document.getElementById("game");
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 4;
	
	registerListeners();
	
	new Platform(0, canvas.width, canvas.height, new Color(0,0,0,1));
	
	gameLoop = setInterval(runGame, 25);
}

function runGame() {
	if (!player.grounded()) {
		player.y += 2;
	}
	render();
}

function render() {
	clearCtx();
	player.draw();
	for (var y in platforms) {
		for (var j = 0; j < platforms[y].length; ++j) {
			platform = platforms[y][j];
			platform.draw();
		}
	}
}

function clearCtx() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function registerListeners() {
	document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
	console.log(e);
	document.getElementById("keycode").innerHTML = e.keyCode;
	
	switch (e.keyCode) {
		case keys.left:
			player.moveLeft();
			e.preventDefault();
			break;
		case keys.right:
			player.moveRight();
			e.preventDefault();
			break;
		case keys.up:
			player.color++;
			e.preventDefault();
			break;
		case keys.down:
			player.colorDown();
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
}

Platform.prototype.draw = function() {
	ctx.strokeStyle = this.color.toString();
	ctx.beginPath();
	ctx.moveTo(this.left, this.y);
	ctx.lineTo(this.right, this.y);
	ctx.stroke();
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
