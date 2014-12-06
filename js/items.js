var items = [];

function makeGoalStars() {
	// hmm... I reckon I could draw a star by treating it as points on two separate circles, 180 degrees out of sync...
	var goalStarOuter = 10;
	var goalStarInner = 4;
	var innerIndexOffset = 3; // pretty sure we want to draw (i+3)%len if they're 1/2 circle out of sync
	var drawGoalStar = function() {
		var outerPoints = [];
		var innerPoints = [];
		var center = this.getPos();
		for (var i = 0; i < 5; ++i) {
			// I have NO IDEA why the -0.25 is needed, and... oh, right.
			// without some offset, it'll end up drawing it to the *right*, not *up*.
			// meh, 0.25 works for now. I could fix the math, but this is a 48 hour game. 
			var angle = Math.PI * 2 * ((i-0.25) / 5);
			outerPoints.push(center.offsetByRadius(goalStarOuter, angle));
			innerPoints.push(center.offsetByRadius(goalStarInner, angle + Math.PI));
		}
		
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.moveTo(innerPoints[2].x, innerPoints[2].y);
		for (var i = 0; i < 5; ++i) {
			ctx.lineTo(outerPoints[i].x, outerPoints[i].y);
			var innerIndex = (i + innerIndexOffset) % 5;
			ctx.lineTo(innerPoints[innerIndex].x, innerPoints[innerIndex].y);
		}
		ctx.fill();
	}
	
	var sideStarHeight = 250;
	
	var goal;
	goal = new Item(25, sideStarHeight, goalStarOuter, new Color(0, 255, 255, 1));
	goal.draw = drawGoalStar;
	goal.goalType = 'red';
	items.push(goal);
	new Platform(0, 50, sideStarHeight + 20, colors[0]);
	
	goal = new Item(canvas.width / 2, 75, goalStarOuter, new Color(255, 0, 255, 1));
	goal.draw = drawGoalStar;
	goal.goalType = 'green';
	items.push(goal);
	new Platform(canvas.width/2 - 25, canvas.width/2 + 25, 95, colors[1]);
	
	// give this a color that has a BIT more contrast than pure yellow...
	goal = new Item(canvas.width - 25, sideStarHeight, goalStarOuter, new Color(235, 235, 0, 1));
	goal.draw = drawGoalStar;
	goal.goalType = 'blue';
	items.push(goal);
	new Platform(canvas.width - 50, canvas.width, sideStarHeight + 20, colors[2]);
}

function Item(x, y, pickupRadius, color) {
	this.x = x;
	this.y = y;
	this.pickupRadius = pickupRadius;
	this.color = color;
	this.goalType = undefined;
}

Item.prototype.getPos = function() {
	return new Point(this.x, this.y);
}

Item.prototype.touchedByPlayer = function() {
	// same algorithm as the mob attacked-by-player
	var rad = this.pickupRadius;
	// had to look up the geometry for this circle and rectangle thing- http://stackoverflow.com/a/1879223
	var nearX = Math.max(player.x, Math.min(this.x, player.x + player.width));
	var nearY = Math.max(player.y, Math.min(this.y, player.y + player.height));
	if (this.getPos().dist(new Point(nearX, nearY)) <= rad) {
		if (this.color.interactsWith(player.getColor())) {
			return true;
		}
	}
	return false;
}
