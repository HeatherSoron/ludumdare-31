var canvas;
var ctx;

var alpha = 1.0 / 2.0;

var colors = [
	new Color(255, 0, 0, alpha, 'red'),
	new Color(0, 255, 0, alpha, 'green'),
	new Color(0, 0, 255, alpha, 'blue'),
];


function render() {
	clearCtx();
	if (!lost) {
		player.draw();
	}
	
	for (var i = 0; i < items.length; ++i) {
		items[i].draw();
	}
	
	for (var i = 0; i < mobs.length; ++i) {
		mobs[i].draw();
	}
	
	for (var y in platforms) {
		for (var j = 0; j < platforms[y].length; ++j) {
			platform = platforms[y][j];
			platform.draw();
		}
	}
	
	drawPowerBar('red', 20);
	drawPowerBar('green', canvas.width/2 - player.power.green[1]/2);
	drawPowerBar('blue', canvas.width - (player.power.blue[1] + 20));
	
	if (lost) {
		ctx.fillStyle = "black";
		ctx.fillText("YOU LOSE", 100, 100);
	} else if (won) {
		ctx.fillStyle = "black";
		ctx.fillText("YOU WIN!", 100, 100);
	}
}

function clearCtx() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// put a grey background for contrast
	ctx.beginPath();
	ctx.fillStyle = 'rgb(248,248,248)';
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fill();
}

function drawPowerBar(colorName, left) {
	var power = player.power[colorName];
	
	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.rect(left, 10, power[1], 15);
	ctx.stroke();
	
	ctx.globalAlpha = 0.8;
	ctx.beginPath();
	ctx.fillStyle = colorName;
	ctx.rect(left, 10, power[0], 15);
	ctx.fill();
	ctx.globalAlpha = 1;
}



function Color(r, g, b, a, name) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	this.name = name;
	
	if (r == 0 && g == 0 && b == 0) {
		this.black = true;
	} else {
		this.black = false;
	}
}

Color.prototype.toString = function() {
	return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
}

Color.prototype.interactsWith = function(otherColor) {
	if (this.black || otherColor.black) {
		return true;
	}
	
	var comp = ['r', 'g', 'b'];
	for (c in comp) {
		if (this[comp[c]] && otherColor[comp[c]]) {
			return true;
		}
	}
	
	return false;
}

Color.prototype.clone = function() {
	return new Color(this.r, this.g, this.b, this.a, this.name);
}

Color.prototype.setAlpha = function(a) {
	this.a = a;
	return this;
}


// DEBUG CODE BELOW

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
