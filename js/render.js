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



function Color(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

Color.prototype.toString = function() {
	return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
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
