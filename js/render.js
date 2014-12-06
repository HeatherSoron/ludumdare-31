var canvas;
var ctx;

var alpha = 1.0 / 3.0;

var colors = [
	new Color(255, 0, 0, alpha),
	new Color(0, 255, 0, alpha),
	new Color(0, 0, 255, alpha),
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
	
	if (lost) {
		ctx.fillStyle = "black";
		ctx.fillText("YOU LOSE", 100, 100);
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



function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	
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
