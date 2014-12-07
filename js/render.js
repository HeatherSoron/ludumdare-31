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
	
	var deadParts = [];
	for (var i = 0; i < particles.length; ++i) {
		if (!particles[i].simAndDraw()) {
			deadParts.push(i);
		}
	}
	for (var i = deadParts.length - 1; i >= 0; --i) {
		particles.splice(deadParts[i], 1);
	}
	
	drawPowerBar('red', 20);
	drawPowerBar('green', canvas.width/2 - player.power.green[1]/2);
	drawPowerBar('blue', canvas.width - (player.power.blue[1] + 20));
	
	if (lost) {
		putText("YOU LOSE");
	} else if (won) {
		putText("YOU WIN!");
		ctx.fillStyle = "black";
	}
}

function putText(str) {
	ctx.font = "bold 50px Arial"
	
	ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx.fillText(str[0], 200, 200);
	ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
	ctx.fillText(str[1], 250, 200);
	ctx.fillStyle = "rgba(0, 0, 255, 0.7)";
	ctx.fillText(str[2], 300, 200);
	
	ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
	ctx.fillText(str[4], (str[4] == 'W' ? 410 : 400), 200);
	ctx.fillStyle = "rgba(0, 0, 255, 0.7)";
	ctx.fillText(str[5], (str[5] == 'I' ? 470 : 450), 200);
	ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
	ctx.fillText(str[6], 500, 200);
	ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
	ctx.fillText(str[7], 550, 200);
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


function drawStar(center, outer, inner, pointCount, rot, color) {
	var outerPoints = [];
	var innerPoints = [];
	var innerIndexOffset = Math.ceil(pointCount / 2.0);
	for (var i = 0; i < pointCount; ++i) {
		var angle = Math.PI * 2 * ((i + rot) / pointCount);
		outerPoints.push(center.offsetByRadius(outer, angle));
		innerPoints.push(center.offsetByRadius(inner, angle + Math.PI));
	}
	
	ctx.beginPath();
	ctx.fillStyle = color.toString();
	ctx.moveTo(innerPoints[2].x, innerPoints[2].y);
	for (var i = 0; i < pointCount; ++i) {
		ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
		var innerIndex = (i + innerIndexOffset) % pointCount;
		ctx.lineTo(innerPoints[innerIndex].x, innerPoints[innerIndex].y);
	}
	ctx.fill();
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

Color.prototype.fade = function() {
	if (this.fadeRate) {
		console.log(this.a, this.fadeRate);
		this.a -= this.fadeRate;
	}
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
